class Modal {

    /**
     * 
     * @param {HTMLElement} element 
     */
    constructor(element) 
    {
        this.element = element;

        /**
         * @type {string|undefined}
         */
        this.content;
    }

    /**
     * 
     * @param {string} content 
     * @returns 
     */
    open(content)
    {
        this.content = content;

        if(this.element === null 
            || this.element === undefined
        ){
            throw new Error("L'élémént n'existe pas : this.element.")
        }

        this.modalContainer = this.createElement('div', 'modal-container position-fixed top-0 w-100 h-100');

        this.modal = this.createElement('div', `main-modal p-2 bg-white w-75 position-absolute start-0 bottom-0 end-0 m-auto`);

        this.appendModalToDOM();

        this.innerDefaultContent();

        this.innerContent();

        this.animateModalShowing();

        this.modalContainer.addEventListener('click', this.closeModalThenRemoveHisEventListener.bind(this));

        this.avoidCloseModalOnClickIn();

        return this.modal;
    }

    /**
     * crée un élément
     * @return {HTMLElement} element
     */
    createElement(type, className = null) 
    {
        const element = document.createElement(type);

        if (className !== null) {
            element.className = className;
        }

        return element;
    }

    appendModalToDOM()
    {
        document.body.appendChild(this.modalContainer);

        this.modalContainer.appendChild(this.modal);
    }

    innerDefaultContent()
    {
        this.modalContentContainer = this.createElement('div', 'container mt-4');

        this.modal.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-x">
            <line x1="15" y1="9" x2="9" y2="15">
            </line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;

        this.modal.appendChild(this.modalContentContainer);

        const closeButton = this.modal.querySelector('.icon-x');
        closeButton.addEventListener('click', this.close.bind(this));
    }

    innerContent()
    {
        if(this.modalContentContainer){
            this.modalContentContainer.innerHTML = this.content;
        }
    }

    animateModalShowing()
    {
        this.modal.offsetWidth;
        this.modal.classList.add('show');
    }

    /**
     * 
     * @param {Event} e 
     */
    closeModalThenRemoveHisEventListener(e)
    {
        e.stopPropagation();

        this.close();

        e.target.removeEventListener('click', this.closeModalThenRemoveHisEventListener);
    }

    close()
    {
        this.modal.classList.remove('show');
    
        setTimeout(() => {
            if(
                this.modalContainer
                && this.modalContainer.parentElement !== null
            ){
                this.modalContainer.parentElement.removeChild(this.modalContainer);
            } 
        }, 300)
    }

    avoidCloseModalOnClickIn()
    {
        this.modal.addEventListener('click', (e)=>{
            e.stopPropagation()
        });
    }
}