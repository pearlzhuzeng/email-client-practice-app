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
  getMailboxes,
} from './store';

function getThreadIds(mailboxName) {
  // Use bracket notation for variable property look up
  const mailbox = store.mailboxes[mailboxName];
  // null check
  return mailbox && mailbox.threadIds;
}

function renderSidebar(mailboxName = 'INBOX') {
  const threadIds = getThreadIds(mailboxName) || [];
  const sidebarContents = `
    <div>${getMailboxes(store)
    .map(mailbox => `<a href="#"
    data-mailbox-name="${mailbox}" class="email-header">${mailbox}</a>`)
    .join('')}</div>
    <ul class="email-list">${threadIds
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

  document.querySelectorAll('.email-header').forEach(node =>
    node.addEventListener('click', (e: Event) => {
      const { currentTarget } = e;
      if (!(currentTarget instanceof HTMLElement)) return;
      const name = currentTarget.dataset.mailboxName; // use data attributes
      renderSidebar(name);
    }));
}

renderSidebar();
