import { LightningElement, api } from 'lwc';

export default class TickerText extends LightningElement {
    @api tickerText = 'This is a lightning web component displaying ticker text.'; // Default ticker text

    charactersToScroll = 100; // Specify the number of characters to scroll at a time
    tickerInterval;

    // Ensure aria-label is set after the DOM is rendered
    renderedCallback() {
        const tickerContainer = this.template.querySelector('.ticker-container');
        if (tickerContainer) {
            tickerContainer.setAttribute('aria-label', `Ticker text: ${this.tickerText}`);
        }
    }

    startTicker() {
        this.tickerInterval = setInterval(() => {
            // Move the specified number of characters to the end to create the scrolling effect
            this.tickerText = this.tickerText.substring(this.charactersToScroll) + this.tickerText.substring(0, this.charactersToScroll);
        }, 3000); // Adjust the interval as needed
    }

    disconnectedCallback() {
        // Clear the interval when the component is disconnected
        clearInterval(this.tickerInterval);
    }
}
