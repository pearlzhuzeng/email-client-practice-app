/**
 * @flow
 */

import store, {
  getMessageSubject,
  getMessageSender,
  getMessageTimestamp,
  getMessageSnippet,
} from './store';

function getThreadIds() {
  let threadIds;
  if (store.mailboxes.INBOX) {
    threadIds = store.mailboxes.INBOX.threadIds;
  } else {
    threadIds = [];
  }
  return threadIds;
}

function renderSidebar() {
  const sidebarContents = `
    <h2 class="email-header">Inbox</h2>
    <ul class="email-list">${getThreadIds()
    .map((threadId) => {
      const message =
          store.threads[threadId].messages[
            store.threads[threadId].messages.length - 1
          ];
      return `<li>
            <button class="email-item" type="button">
              <div class="sender-details">
                <p>${getMessageSender(store.messages[message.id]) || ''}</p>
                <span>${getMessageTimestamp(store.messages[message.id]) ||
                  ''}</span>
              </div>
              <p class="email-subject">
                ${getMessageSubject(store.messages[message.id]) || ''}</p>
              <p>${getMessageSnippet(message)}</p>
            </button>
          </li>`;
    })
    .join('')}</ul>
    `;

  const container = document.querySelector('.email-list-container');
  if (container != null) container.innerHTML = sidebarContents;
}

renderSidebar();
