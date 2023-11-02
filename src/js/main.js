/**
 * CONSIGNE : - Il faut charger les scripts dans l'ordre suivant :
 * <script src="src/js/jquery.min.js"></script>
 * <script src="src/js/owl.carousel.min.js"></script>
 * <script src="src/js/modal.js"></script>
 * <script src="src/js/main.js"></script>
 * 
 * - Il faut remplacer la valeur de 'src' des balises script par les chemins absolues dans le véritable projet
 */

// REMPLACER '.realisation' PAR LE SELECTEUR DE L'ELEMENT REALISATION REEL
const realisations = Array.from(document.querySelectorAll('.realisation'));
if(realisations && realisations.length > 0){
    
    realisations.forEach(function(realisation){   
        const modal = new Modal(realisation);

        realisation.addEventListener('click', function(e){
            e.preventDefault();

            const index = realisations.indexOf(realisation);            
            
            const content = theContent(index);

            createCarousel(index);
            
            modal.open(content);
        });
    });
}

function theContent(index) {
    const infos = getInfos(index)

    return `
    <div class='d-flex justify-content-between flex-md-row'>
        <div class="owl-carousel owl-theme" id="carousel">
            <div class='item'>
                <img class="d-block w-100" src="/images/realisation-1.webp">
            </div>
            <div class='item'>
                <img class="d-block w-100" src="/images/realisation-2.png">
            </div>
            <div class='item'>
                <img class="d-block w-100" src="/images/realisation-3.png">
            </div>
        </div>
        <div class="infos">
            ${infos}
        </div>
    </div>
`;
}

function createCarousel(index) {
    $(document).ready(function(){
        $('.owl-carousel').owlCarousel({
            items: 1,
            nav: false,
            dots: false,
            lazyLoad: true
        });

        $(".owl-carousel").trigger("to.owl.carousel", [index, 1]);

        let activeIndex = index;
        const carouselButtonPrev = document.querySelector(".owl-nav .owl-prev");
        
        if (carouselButtonPrev) {
            carouselButtonPrev.addEventListener("click", function (e) {
                e.stopPropagation();
                
                if(activeIndex > 0){
                    activeIndex = activeIndex - 1;
                    getInfos(activeIndex, true);
                }
            });
        }

        const carouselButtonNext = document.querySelector(".owl-nav .owl-next");
        if (carouselButtonNext) {
            carouselButtonNext.addEventListener("click", function (e) {
                e.stopPropagation();
                
                if(activeIndex < realisations.length - 1){
                    activeIndex = activeIndex + 1;
                    getInfos(activeIndex, true);
                }
            });
        }
    });   
    
    
}

/* 
* SE CHARGE D'AFFICHER OU OU DE RETOURNER LES PIERRES UTILISES POUR LA REALISATION COURANTE
* RETOURN LA LISTE DES PIERRES UTILISEES SI L'UTILISATEUR N'A PAS DEFILE LE CAROUSEL 
* SINON MODIFIE DIRECTEMENT LA LISTE
*/
function getInfos(index, change = false){
    let infos;

    switch(index){
        case 0:
            infos = "JAVA GREEN - PISCINE";
            break
        case 1:
            infos = "Tiger Slate au Diana Dea Lodge"
            break
        case 2:
            infos = "BLACK SLATE - PISCINE" 
            break   
    }

    if(change === false){
        return infos;
    }
    
    const infosElement = document.querySelector('.infos');
    if(infosElement){
        infosElement.innerHTML = infos;
    }
}
