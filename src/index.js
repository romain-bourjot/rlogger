// @flow

import {format} from 'rlogger/formatter';

const LOG_LEVELS = {
	fatal: 0,
	error: 1,
	warn: 2,
	info: 3,
	debug: 4
};

type LogLevel = typeof LOG_LEVELS;

export type Transport = {
	+[$Keys<LogLevel>]: (string) => mixed
};

export class RLogger<O: {+[string]: {level: $Keys<LogLevel>, message: string}}> {
	+transport: Transport;
	+logLevel: $Values<LogLevel>;
	+messageMap: O;

	constructor({
		transport,
		logLevel,
		messageMap
	}: {
		transport: Transport,
		logLevel: $Keys<LogLevel>,
		messageMap: O
	}) {
		this.transport = transport;
		this.logLevel = LOG_LEVELS[logLevel];
		this.messageMap = messageMap;
	}

	log({details, messageKey}: {details: any, messageKey: $Keys<O>}): mixed {
		const level = this.messageMap[messageKey].level;
		const message = this.messageMap[messageKey].message;

		if (this.logLevel < LOG_LEVELS[level]) {
			return null;
		}

		const formattedMessage = `${level}.${message}`;
		const formattedDetails = format(details);

		return this.transport[level](`${formattedMessage} ${formattedDetails}`);
	}
}
