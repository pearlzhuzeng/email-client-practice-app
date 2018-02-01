/**
 * The data store is currently a JSON file, but its schema mirrors the Gmail
 * API so we can feed it from your own inbox at a later date.
 *
 * This file stores the helper functions
 *
 * @flow
 */

import type { Data, Message, MessageMetadata } from './types';

const store: Data = require('./emails.json');

/**
 * You might find it useful to implement some functions that make accessing
 * deeply nested attributes of Messages or Threads easier...
 */

// For example, this returns the subject of a given message if it is defined
// by a header in the message payload
export function getMessageSubject(message: Message): ?string {
  const { headers } = message.payload;
  const subjectHeader = headers.find(header => header.name === 'Subject');
  return subjectHeader && subjectHeader.value;
}

export function getMessageSender(message: Message): ?string {
  const { headers } = message.payload;
  const emailSender = headers.find(header => header.name === 'From');
  if (emailSender == null) {
    throw new Error("Watch out! It's weird that there is no sender.");
  }
  return emailSender && emailSender.value;
}

export function getMessageTimestamp(messageMetadata: MessageMetadata): string {
  const emailTimestamp = messageMetadata.internalDate;
  return emailTimestamp;
}

export function getMessageSnippet(messageMetadata: MessageMetadata): string {
  const emailSnippet = messageMetadata.snippet;
  return emailSnippet;
}

export function formatSender(messageSender: string): string {
  const formattedSender = messageSender.split('\\')[0];
  return formattedSender;
}

export function formatTime(messageTimestamp: string): string {
  const formattedTime = new Date(Number(messageTimestamp));
  const locale = navigator.language;
  return formattedTime.toLocaleTimeString(locale, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
  });
}

export default store;
