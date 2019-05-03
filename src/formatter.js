// @flow

import {inspect} from 'util';

const formatError = (error: Error) => ({
	message: error.message,
	stack: error.stack
});

export function format(details: any): string {
	try {
		return JSON.stringify(
			details,
			(key: string, value: any) => value instanceof Error ? formatError(value) : value
		);
	} catch (err) {
		return inspect(details, {depth: Infinity, breakLength: Infinity});
	}
}
