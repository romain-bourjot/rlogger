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
			emerg: sinon.stub().returns(null),
			alert: sinon.stub().returns(null),
			crit: sinon.stub().returns(null),
			err: sinon.stub().returns(null),
			warning: sinon.stub().returns(null),
			notice: sinon.stub().returns(null),
			info: sinon.stub().returns(null),
			debug: sinon.stub().returns(null)
		});

		const createMessageMap = () => ({
			emergMessage: {level: 'emerg', message: 'emerg_message'},
			alertMessage: {level: 'alert', message: 'alert_message'},
			critMessage: {level: 'crit', message: 'crit_message'},
			errMessage: {level: 'err', message: 'err_message'},
			warningMessage: {level: 'warning', message: 'warning_message'},
			noticeMessage: {level: 'notice', message: 'notice_message'},
			infoMessage: {level: 'info', message: 'info_message'},
			debugMessage: {level: 'debug', message: 'debug_message'}
		});

		const getActualResult = (stubTransport) => ({
			emerg: stubTransport.emerg.calledOnce && stubTransport.emerg.lastCall.args,
			alert: stubTransport.alert.calledOnce && stubTransport.alert.lastCall.args,
			crit: stubTransport.crit.calledOnce && stubTransport.crit.lastCall.args,
			err: stubTransport.err.calledOnce && stubTransport.err.lastCall.args,
			warning: stubTransport.warning.calledOnce && stubTransport.warning.lastCall.args,
			notice: stubTransport.notice.calledOnce && stubTransport.notice.lastCall.args,
			info: stubTransport.info.calledOnce && stubTransport.info.lastCall.args,
			debug: stubTransport.debug.calledOnce && stubTransport.debug.lastCall.args
		});

		const callLoggerWithAllMessages = (logger) => {
			logger.log({messageKey: 'emergMessage', details: 'anyDetails'});
			logger.log({messageKey: 'alertMessage', details: 'anyDetails'});
			logger.log({messageKey: 'critMessage', details: 'anyDetails'});
			logger.log({messageKey: 'errMessage', details: 'anyDetails'});
			logger.log({messageKey: 'warningMessage', details: 'anyDetails'});
			logger.log({messageKey: 'noticeMessage', details: 'anyDetails'});
			logger.log({messageKey: 'infoMessage', details: 'anyDetails'});
			logger.log({messageKey: 'debugMessage', details: 'anyDetails'});
		};

		it('Should correctly log with LOG_LEVEL=emerg', () => {
			const stubTransport = createStubTransport();
			const messageMap = createMessageMap();

			const logger = new RLogger({
				transport: stubTransport,
				messageMap,
				logLevel: 'emerg'
			});

			callLoggerWithAllMessages(logger);

			const actual = getActualResult(stubTransport);

			const expected = {
				emerg: ['emerg.emerg_message expectedFormattedDetails'],
				alert: false,
				crit: false,
				err: false,
				warning: false,
				notice: false,
				info: false,
				debug: false
			};

			expect(actual).to.deep.equal(expected);
		});

		it('Should correctly log with LOG_LEVEL=alert', () => {
			const stubTransport = createStubTransport();
			const messageMap = createMessageMap();

			const logger = new RLogger({
				transport: stubTransport,
				messageMap,
				logLevel: 'alert'
			});

			callLoggerWithAllMessages(logger);

			const actual = getActualResult(stubTransport);

			const expected = {
				emerg: ['emerg.emerg_message expectedFormattedDetails'],
				alert: ['alert.alert_message expectedFormattedDetails'],
				crit: false,
				err: false,
				warning: false,
				notice: false,
				info: false,
				debug: false
			};

			expect(actual).to.deep.equal(expected);
		});

		it('Should correctly log with LOG_LEVEL=crit', () => {
			const stubTransport = createStubTransport();
			const messageMap = createMessageMap();

			const logger = new RLogger({
				transport: stubTransport,
				messageMap,
				logLevel: 'crit'
			});

			callLoggerWithAllMessages(logger);

			const actual = getActualResult(stubTransport);

			const expected = {
				emerg: ['emerg.emerg_message expectedFormattedDetails'],
				alert: ['alert.alert_message expectedFormattedDetails'],
				crit: ['crit.crit_message expectedFormattedDetails'],
				err: false,
				warning: false,
				notice: false,
				info: false,
				debug: false
			};

			expect(actual).to.deep.equal(expected);
		});

		it('Should correctly log with LOG_LEVEL=err', () => {
			const stubTransport = createStubTransport();
			const messageMap = createMessageMap();

			const logger = new RLogger({
				transport: stubTransport,
				messageMap,
				logLevel: 'err'
			});

			callLoggerWithAllMessages(logger);

			const actual = getActualResult(stubTransport);

			const expected = {
				emerg: ['emerg.emerg_message expectedFormattedDetails'],
				alert: ['alert.alert_message expectedFormattedDetails'],
				crit: ['crit.crit_message expectedFormattedDetails'],
				err: ['err.err_message expectedFormattedDetails'],
				warning: false,
				notice: false,
				info: false,
				debug: false
			};

			expect(actual).to.deep.equal(expected);
		});

		it('Should correctly log with LOG_LEVEL=warning', () => {
			const stubTransport = createStubTransport();
			const messageMap = createMessageMap();

			const logger = new RLogger({
				transport: stubTransport,
				messageMap,
				logLevel: 'warning'
			});

			callLoggerWithAllMessages(logger);

			const actual = getActualResult(stubTransport);

			const expected = {
				emerg: ['emerg.emerg_message expectedFormattedDetails'],
				alert: ['alert.alert_message expectedFormattedDetails'],
				crit: ['crit.crit_message expectedFormattedDetails'],
				err: ['err.err_message expectedFormattedDetails'],
				warning: ['warning.warning_message expectedFormattedDetails'],
				notice: false,
				info: false,
				debug: false
			};

			expect(actual).to.deep.equal(expected);
		});

		it('Should correctly log with LOG_LEVEL=notice', () => {
			const stubTransport = createStubTransport();
			const messageMap = createMessageMap();

			const logger = new RLogger({
				transport: stubTransport,
				messageMap,
				logLevel: 'notice'
			});

			callLoggerWithAllMessages(logger);

			const actual = getActualResult(stubTransport);

			const expected = {
				emerg: ['emerg.emerg_message expectedFormattedDetails'],
				alert: ['alert.alert_message expectedFormattedDetails'],
				crit: ['crit.crit_message expectedFormattedDetails'],
				err: ['err.err_message expectedFormattedDetails'],
				warning: ['warning.warning_message expectedFormattedDetails'],
				notice: ['notice.notice_message expectedFormattedDetails'],
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
				emerg: ['emerg.emerg_message expectedFormattedDetails'],
				alert: ['alert.alert_message expectedFormattedDetails'],
				crit: ['crit.crit_message expectedFormattedDetails'],
				err: ['err.err_message expectedFormattedDetails'],
				warning: ['warning.warning_message expectedFormattedDetails'],
				notice: ['notice.notice_message expectedFormattedDetails'],
				info: ['info.info_message expectedFormattedDetails'],
				debug: false
			};

			expect(actual).to.deep.equal(expected);
		});

		it('Should correctly log with LOG_LEVEL=debug', () => {
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
				emerg: ['emerg.emerg_message expectedFormattedDetails'],
				alert: ['alert.alert_message expectedFormattedDetails'],
				crit: ['crit.crit_message expectedFormattedDetails'],
				err: ['err.err_message expectedFormattedDetails'],
				warning: ['warning.warning_message expectedFormattedDetails'],
				notice: ['notice.notice_message expectedFormattedDetails'],
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
