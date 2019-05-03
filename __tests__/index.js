// @noflow

import {expect} from 'chai';
import sinon from 'sinon';

import {RLogger} from 'rlogger';
import * as formatter from 'rlogger/formatter';

describe('rlogger', () => {
	describe('logLevel', () => {
		beforeEach(() => {
			sinon.stub(formatter, 'format').returns('expectedFormattedDetails');
		});

		afterEach(() => {
			sinon.restore();
		});

		const createStubTransport = () => ({
			fatal: sinon.stub().returns(null),
			error: sinon.stub().returns(null),
			warn: sinon.stub().returns(null),
			info: sinon.stub().returns(null),
			debug: sinon.stub().returns(null)
		});

		const createMessageMap = () => ({
			fatalMessage: {level: 'fatal', message: 'fatal_message'},
			errorMessage: {level: 'error', message: 'error_message'},
			warnMessage: {level: 'warn', message: 'warn_message'},
			infoMessage: {level: 'info', message: 'info_message'},
			debugMessage: {level: 'debug', message: 'debug_message'}
		});

		const getActualResult = (stubTransport) => ({
			fatal: stubTransport.fatal.calledOnce && stubTransport.fatal.lastCall.args,
			error: stubTransport.error.calledOnce && stubTransport.error.lastCall.args,
			warn: stubTransport.warn.calledOnce && stubTransport.warn.lastCall.args,
			info: stubTransport.info.calledOnce && stubTransport.info.lastCall.args,
			debug: stubTransport.debug.calledOnce && stubTransport.debug.lastCall.args
		});

		const callLoggerWithAllMessages = (logger) => {
			logger.log({messageKey: 'fatalMessage', details: 'anyDetails'});
			logger.log({messageKey: 'errorMessage', details: 'anyDetails'});
			logger.log({messageKey: 'warnMessage', details: 'anyDetails'});
			logger.log({messageKey: 'infoMessage', details: 'anyDetails'});
			logger.log({messageKey: 'debugMessage', details: 'anyDetails'});
		};

		it('Should correctly log with LOG_LEVEL=fatal', () => {
			const stubTransport = createStubTransport();
			const messageMap = createMessageMap();

			const logger = new RLogger({
				transport: stubTransport,
				messageMap,
				logLevel: 'fatal'
			});

			callLoggerWithAllMessages(logger);

			const actual = getActualResult(stubTransport);

			const expected = {
				fatal: ['fatal.fatal_message expectedFormattedDetails'],
				error: false,
				warn: false,
				info: false,
				debug: false
			};

			expect(actual).to.deep.equal(expected);
		});

		it('Should correctly log with LOG_LEVEL=error', () => {
			const stubTransport = createStubTransport();
			const messageMap = createMessageMap();

			const logger = new RLogger({
				transport: stubTransport,
				messageMap,
				logLevel: 'error'
			});

			callLoggerWithAllMessages(logger);

			const actual = getActualResult(stubTransport);

			const expected = {
				fatal: ['fatal.fatal_message expectedFormattedDetails'],
				error: ['error.error_message expectedFormattedDetails'],
				warn: false,
				info: false,
				debug: false
			};

			expect(actual).to.deep.equal(expected);
		});

		it('Should correctly log with LOG_LEVEL=warn', () => {
			const stubTransport = createStubTransport();
			const messageMap = createMessageMap();

			const logger = new RLogger({
				transport: stubTransport,
				messageMap,
				logLevel: 'warn'
			});

			callLoggerWithAllMessages(logger);

			const actual = getActualResult(stubTransport);

			const expected = {
				fatal: ['fatal.fatal_message expectedFormattedDetails'],
				error: ['error.error_message expectedFormattedDetails'],
				warn: ['warn.warn_message expectedFormattedDetails'],
				info: false,
				debug: false
			};

			expect(actual).to.deep.equal(expected);
		});

		it('Should correctly log with LOG_LEVEL=info', () => {
			const stubTransport = createStubTransport();
			const messageMap = createMessageMap();

			const logger = new RLogger({
				transport: stubTransport,
				messageMap,
				logLevel: 'info'
			});

			callLoggerWithAllMessages(logger);

			const actual = getActualResult(stubTransport);

			const expected = {
				fatal: ['fatal.fatal_message expectedFormattedDetails'],
				error: ['error.error_message expectedFormattedDetails'],
				warn: ['warn.warn_message expectedFormattedDetails'],
				info: ['info.info_message expectedFormattedDetails'],
				debug: false
			};

			expect(actual).to.deep.equal(expected);
		});

		it('Should correctly log with LOG_LEVEL=info', () => {
			const stubTransport = createStubTransport();
			const messageMap = createMessageMap();

			const logger = new RLogger({
				transport: stubTransport,
				messageMap,
				logLevel: 'debug'
			});

			callLoggerWithAllMessages(logger);

			const actual = getActualResult(stubTransport);

			const expected = {
				fatal: ['fatal.fatal_message expectedFormattedDetails'],
				error: ['error.error_message expectedFormattedDetails'],
				warn: ['warn.warn_message expectedFormattedDetails'],
				info: ['info.info_message expectedFormattedDetails'],
				debug: ['debug.debug_message expectedFormattedDetails']
			};

			expect(actual).to.deep.equal(expected);
		});
	});

	describe('formatter', () => {
		it('Should correctly format object', () => {
			const toFormat = {
				foo: {
					bar: {
						foobar: 'hello'
					}
				}
			};

			const actual = formatter.format(toFormat);

			const expected = '{"foo":{"bar":{"foobar":"hello"}}}';

			expect(actual).to.equal(expected);
		});

		it('Should correctly format errors', () => {
			const toFormat = new Error('Oupsy');
			toFormat.stack = 'stack1\nstack2\nstack3';

			const actual = formatter.format(toFormat);

			const expected = '{"message":"Oupsy","stack":"stack1\\nstack2\\nstack3"}';

			expect(actual).to.equal(expected);
		});

		it('Should correctly format circular objects', () => {
			const toFormat = {
				foo: {
					bar: 'foobar'
				}
			};
			toFormat.foo.foobar = toFormat.foo;

			const actual = formatter.format(toFormat);

			const expected = '{ foo: { bar: \'foobar\', foobar: [Circular] } }';

			expect(actual).to.equal(expected);
		});

		it('Should correctly format circular long objects', () => {
			const toFormat = {
				foo: {
					bar: 'foobar'
				},
				longArray: [
					1,
					2,
					3,
					4,
					5,
					6,
					7,
					8,
					9
				]
			};
			toFormat.foo.foobar = toFormat.foo;

			const actual = formatter.format(toFormat);

			// eslint-disable-next-line max-len
			const expected = '{ foo: { bar: \'foobar\', foobar: [Circular] }, longArray: [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ] }';

			expect(actual).to.equal(expected);
		});
	});
});
