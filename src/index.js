/**
 * @flow
 */

import store, {
  getMessageSubject,
  getMessageSender,
  getMessageTimestamp,
  getMessageSnippet,
  formatSender,
  formatTime,
} from './store';

function getThreadIds() {
  const { INBOX } = store.mailboxes;
  if (INBOX == null) return [];
  return INBOX.threadIds;
}

function renderSidebar() {
  const sidebarContents = `
    <h2 class="email-header">Inbox</h2>
    <ul class="email-list">${getThreadIds()
    .map((threadId) => {
      const { messages } = store.threads[threadId];
      const messageMetadata = messages[messages.length - 1];
      const message = store.messages[messageMetadata.id];
      return `<li>
            <button class="email-item" type="button">
              <div class="sender-details">
                <p>${formatSender(getMessageSender(message) || '')}</p>
                <span>${formatTime(getMessageTimestamp(message)) ||
                  'Unknown Date'}</span>
              </div>
              <p class="email-subject">
                ${getMessageSubject(message) || 'No Subject'}</p>
              <p>${getMessageSnippet(messageMetadata)}</p>
            </button>
          </li>`;
    })
    .join('')}</ul>
    `;

  const container = document.querySelector('.email-list-container');
  if (container != null) container.innerHTML = sidebarContents;
}

renderSidebar();
