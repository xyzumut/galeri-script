
const bekle = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds*1000));

class ResimGalerisi{

    resimler;
    modal;
    modalImg;
    index;
    galeriContainer;
    closeModal;
    next;
    prev;
    scale;

    constructor({containerSelector}) {

        this.galeriContainer    = document.querySelector(containerSelector);
        this.resimler           = document.querySelectorAll(containerSelector + ' img');
        this.modal              = document.getElementById('resim-galerisi-modal');
        this.modalImg           = document.getElementById('resim-galerisi-image');
        this.closeModal         = document.getElementById('resim-galerisi-close');
        this.next               = document.getElementById('resim-galerisi-next');
        this.prev               = document.getElementById('resim-galerisi-prev');
        this.scale              = 1;
        
        this.index = 0;

        Array.from(this.resimler).forEach((img, index) => {
            img.addEventListener('click', () => {
                this.modal.style.display = 'flex';
                this.modalImg.src = img.src;
                this.index = index;
                this.modalImg.classList.add('resim-galerisi-giris')
            });
        });

        this.closeModal.addEventListener('click', () => {
            this.modal.style.display = 'none';
        });

        this.prev.addEventListener('click', () => {

            this.modalImg.classList.remove('resim-galerisi-giris')
            this.modalImg.classList.add('resim-galerisi-cikis')

            setTimeout(() => {
                this.index--;
                if (this.index < 0) {
                    this.index = this.resimler.length - 1;
                }
                this.modalImg.src = this.resimler[this.index].src;
                this.modalImg.classList.add('resim-galerisi-giris')
                this.modalImg.classList.remove('resim-galerisi-cikis')
               
            }, 500)

        });

        this.next.addEventListener('click', async () => {

            this.modalImg.classList.remove('resim-galerisi-giris')
            this.modalImg.classList.add('resim-galerisi-cikis')

            setTimeout( () => {
                this.index++
                if (this.index >= this.resimler.length) {
                    this.index = 0;
                }
                this.modalImg.classList.remove('resim-galerisi-cikis')
                this.modalImg.classList.add('resim-galerisi-giris')
                this.modalImg.src = this.resimler[this.index].src;

            }, 500)

        });

        window.onclick = (e) => {
            if (e.target == this.modal) {
                this.modal.style.display = "none";
            }
        }

        this.modalImg.addEventListener('wheel', (e) => {
            e.preventDefault();
            this.scale += e.deltaY * -0.0005;
            this.scale = Math.min(Math.max(.125, this.scale), 4);
            this.modalImg.style.transform = `scale(${this.scale})`;
        });
    }

}