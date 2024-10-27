import { LightningElement, api, track } from 'lwc';

export default class TickerText extends LightningElement {
  @api tickerText = 'This is a lightning web component displaying ticker text.'; // Default text
  @track isPaused = false; // Track whether the ticker is paused or not
  @track buttonLabel = 'Pause Ticker'; // Default label for the button

  charactersToScroll = 100; // Specify the number of characters to scroll at a time
  tickerInterval;

  // Ensure aria-label is set after the DOM is rendered
  renderedCallback() {
    const tickerContainer = this.template.querySelector('.ticker-container');
    if (tickerContainer) {
      tickerContainer.setAttribute('aria-label', `Ticker text: ${this.tickerText}`);
    }
  }

  // Start the ticker animation
  connectedCallback() {
    this.startTicker();
  }

  // Method to toggle the pause and resume of the animation
  togglePause() {
    const tickerContent = this.template.querySelector('.ticker-content');
    this.isPaused = !this.isPaused;

    if (this.isPaused) {
      tickerContent.classList.add('paused');
      this.buttonLabel = 'Resume Ticker'; // Update button label
    } else {
      tickerContent.classList.remove('paused');
      this.buttonLabel = 'Pause Ticker'; // Update button label
    }
  }

  // Start the text scrolling animation
  startTicker() {
    this.tickerInterval = setInterval(() => {
      this.tickerText = this.tickerText.substring(this.charactersToScroll) + this.tickerText.substring(0, this.charactersToScroll);
    }, 3000); // Adjust the interval as needed
  }

  // Clear the ticker interval when disconnected
  disconnectedCallback() {
    clearInterval(this.tickerInterval);
  }
}
