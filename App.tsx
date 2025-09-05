
import React, { useState, useEffect } from 'react';
import { QUOTES } from './constants/quotes';
import { CATALOG_ITEMS, CatalogItem } from './constants/catalogItems';
import LinkButton from './components/LinkButton';
import Modal from './components/Modal';
import RatingStars from './components/RatingStars';
import ImageSlider from './components/ImageSlider';
import { InstagramIcon, CatalogIcon, WhatsAppIcon, GoogleIcon, StarIcon, LocationIcon, SunIcon, MoonIcon } from './components/Icons';

type ModalType = 'whatsapp' | 'rating' | 'feedback' | 'catalogList' | 'catalogDetail' | 'catalogForm' | 'location' | null;
type Theme = 'dark' | 'light';

const App: React.FC = () => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [rating, setRating] = useState(0);
  const [theme, setTheme] = useState<Theme>('light');

  // Coin State
  const [isFlipping, setIsFlipping] = useState(false);
  const [rotation, setRotation] = useState(0);
  
  // General Contact Form State
  const [whatsappName, setWhatsappName] = useState('');
  const [whatsappAge, setWhatsappAge] = useState('');
  const [whatsappSize, setWhatsappSize] = useState<string[]>([]);
  const [whatsappQuery, setWhatsappQuery] = useState('');

  // Catalog State
  const [selectedItem, setSelectedItem] = useState<CatalogItem | null>(null);
  const [catalogFormName, setCatalogFormName] = useState('');
  const [catalogFormAge, setCatalogFormAge] = useState('');
  const [catalogFormSize, setCatalogFormSize] = useState('');
  const [catalogFormPayment, setCatalogFormPayment] = useState<string[]>([]);
  const [catalogFormNotes, setCatalogFormNotes] = useState('');

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleCoinClick = () => {
    if (isFlipping) return;

    setIsFlipping(true);
    const newRotation = rotation + 1800 + (Math.random() < 0.5 ? 0 : 180);
    setRotation(newRotation);

    setTimeout(() => {
        setIsFlipping(false);
    }, 1200);
  };
  
  const handleRatingSubmit = (rate: number) => {
    setRating(rate);
    if (rate === 5) {
      window.open('https://search.google.com/local/writereview?placeid=ChIJK4X2rhwb6JQRdCmhXlK79PM', '_blank');
      setActiveModal(null);
    } else {
      setActiveModal('feedback');
    }
  };
  
  const resetWhatsappForm = () => {
      setWhatsappName('');
      setWhatsappAge('');
      setWhatsappSize([]);
      setWhatsappQuery('');
  }

  const handleWhatsAppSubmit = () => {
    const message = `Olá! Meu nome é ${whatsappName}.
Idade: ${whatsappAge}.
Tamanho de roupa: ${whatsappSize.length > 0 ? whatsappSize.join(', ') : 'Não informado'}.
Estou buscando o seguinte: ${whatsappQuery}`;
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = '554299195235';
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    setActiveModal(null);
    resetWhatsappForm();
  };
  
  const handleWhatsappSizeChange = (size: string) => {
    setWhatsappSize(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const handleCatalogInquirySubmit = () => {
    if (!selectedItem) return;
    const message = `Olá! Tenho interesse na peça: *${selectedItem.name}*
---
*Meus Dados:*
- *Nome:* ${catalogFormName}
- *Idade:* ${catalogFormAge}
- *Tamanho:* ${catalogFormSize}
- *Forma de Pagamento:* ${catalogFormPayment.join(', ') || 'Não especificado'}
---
*Observações:*
${catalogFormNotes || 'Nenhuma'}
`;
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = '554299195235';
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    setActiveModal(null);
    resetCatalogForm();
  };

  const resetCatalogForm = () => {
      setSelectedItem(null);
      setCatalogFormName('');
      setCatalogFormAge('');
      setCatalogFormSize('');
      setCatalogFormPayment([]);
      setCatalogFormNotes('');
  }

  const handlePaymentChange = (paymentMethod: string) => {
    setCatalogFormPayment(prev => 
      prev.includes(paymentMethod) 
        ? prev.filter(p => p !== paymentMethod)
        : [...prev, paymentMethod]
    );
  };

  const openCatalogItem = (item: CatalogItem) => {
    setSelectedItem(item);
    setActiveModal('catalogDetail');
  };

  const getFeedbackContent = (rating: number) => {
    switch (rating) {
      case 1: return { title: "O que aconteceu?", message: "Lamentamos muito pela sua experiência. Por favor, conte-nos em detalhes o que houve para que possamos resolver da melhor forma." };
      case 2: return { title: "Como podemos melhorar?", message: "Sua opinião é crucial para nós. O que podemos fazer para tornar sua próxima experiência com a Moda&CIA incrível?" };
      case 3: return { title: "Conte-nos um pouco mais", message: "Agradecemos seu feedback. Gostaríamos de entender melhor sua perspectiva para aprimorar nossos services e produtos." };
      case 4: return { title: "Obrigado pelo seu tempo!", message: `Ficamos felizes que tenha gostado, mas queremos sempre ir além. Como podemos transformar sua avaliação de ${rating} em 5 estrelas?` };
      default: return { title: "Que pena!", message: "Conte-nos como podemos melhorar. Seu feedback é muito valioso!" };
    }
  };

  const developerWhatsAppUrl = `https://wa.me/5541988710303?text=${encodeURIComponent('Olá, vi o link da Moda&CIA e quero um site igual!')}`;
  const feedbackContent = getFeedbackContent(rating);

  // Common classes
  const animatedTextClass = theme === 'dark' ? 'animate-silver-text' : 'animate-dark-text';
  const subTextColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const mainButtonBaseClasses = `w-full font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2`;
  const mainButtonThemeClasses = theme === 'dark' 
    ? 'bg-gradient-to-r from-neutral-800 via-neutral-900 to-black text-white hover:shadow-lg hover:shadow-gray-400/40' 
    : 'shadow-lg shadow-black/15 animate-light-marble text-black hover:shadow-xl hover:shadow-black/20';
  
  const secondaryButtonBg = theme === 'dark' ? 'bg-neutral-700 hover:bg-neutral-600' : 'shadow-md shadow-black/10 bg-white/50 backdrop-blur-sm text-black hover:bg-white/70';
  
  const inputBg = theme === 'dark' ? 'bg-neutral-800/50' : 'bg-white/95 backdrop-blur-sm shadow-inner shadow-black/5';
  const placeholderColor = theme === 'dark' ? 'placeholder-neutral-400' : 'placeholder-neutral-400';
  const focusRing = theme === 'dark' ? 'focus:ring-gray-500' : 'focus:ring-gray-400';
  const inputBaseClasses = `w-full border-none rounded-lg px-4 py-2 focus:outline-none focus:ring-2 transition-shadow`;
  const inputClasses = `${inputBaseClasses} ${inputBg} ${theme === 'dark' ? 'text-white' : 'text-black'} ${placeholderColor} ${focusRing}`;

  const checkboxClasses = theme === 'dark' ? 'form-checkbox h-4 w-4 rounded bg-neutral-700 border-neutral-600 text-gray-400 focus:ring-gray-400' : 'form-checkbox h-4 w-4 rounded bg-white border-gray-300 text-gray-800 focus:ring-gray-800';
  const footerLinkThemeClasses = theme === 'dark'
    ? 'animate-silver-text bg-neutral-900/80 hover:shadow-lg hover:shadow-gray-400/40'
    : `text-black shadow-lg shadow-black/15 animate-light-marble hover:shadow-xl hover:shadow-black/20`;

  return (
    <div className="relative min-h-screen w-full bg-black flex flex-col items-center justify-between p-4 sm:p-6 font-sans">
      <div className="wavy-background"></div>
      
      <main className="w-full max-w-md mx-auto flex flex-col items-center justify-center flex-grow z-10">
        <div className="w-full rounded-3xl p-px bg-animated-border shadow-2xl shadow-neutral-800/20">
          <div className={`relative overflow-hidden w-full h-full rounded-[23px] p-6 sm:p-8 ${theme === 'dark' ? 'bg-black/40 backdrop-blur-lg text-white' : 'animate-light-marble text-black'}`}>
             <button onClick={toggleTheme} className={`absolute top-4 right-4 p-2 rounded-full transition-colors duration-300 ${theme === 'dark' ? 'text-gray-300 hover:bg-white/10' : 'text-gray-600 hover:bg-black/10'}`} aria-label="Mudar tema">
                {theme === 'light' ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
             </button>
             
            {theme === 'dark' && <img src="/logo1.png" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-[0.03] pointer-events-none" />}
            
            <header className="relative flex flex-col items-center text-center">
              <div className="flex justify-center mb-6">
                <div className="coin-wrapper" onClick={handleCoinClick} role="button" aria-label="Jogue a moeda da sorte" tabIndex={0}>
                    <div className="coin w-32 h-32" style={{ transform: `rotateY(${rotation}deg)` }}>
                        <div className="coin-face w-full h-full rounded-full"><img src="/moeda.png" alt="Moeda da Sorte - Cara" className="w-full h-full rounded-full object-cover" /></div>
                        <div className="coin-face coin-back w-full h-full rounded-full"><img src="/moeda.png" alt="Moeda da Sorte - Coroa" className="w-full h-full rounded-full object-cover" /></div>
                    </div>
                </div>
              </div>

              <img src={theme === 'dark' ? "/logo.png" : "/logo2.png"} alt="Logotipo Moda&CIA" className="h-20 sm:h-24 mx-auto py-1" />

              <div className="h-12 sm:h-14 mt-4 flex items-center justify-center">
                 <p className={`text-lg sm:text-xl font-bold tracking-wider px-4 ${animatedTextClass}`}>
                  {QUOTES[0]}
                </p>
              </div>
            </header>

            <section className="relative mt-6 sm:mt-8 space-y-4">
              <LinkButton theme={theme} href="https://www.instagram.com/moda.cia.pg/" text="Instagram" icon={<InstagramIcon />} />
              <LinkButton theme={theme} onClick={() => setActiveModal('catalogList')} text="Catálogo" icon={<CatalogIcon />} />
              <LinkButton theme={theme} onClick={() => setActiveModal('whatsapp')} text="Contato" icon={<WhatsAppIcon />} />
              <LinkButton theme={theme} onClick={() => setActiveModal('location')} text="Localização" icon={<LocationIcon />} />
              <LinkButton theme={theme} onClick={() => setActiveModal('rating')} text="Avalie nossa loja" icon={<GoogleIcon />} />
            </section>
          </div>
        </div>
      </main>

      <footer className="w-full max-w-md mx-auto text-center text-sm mt-8 pb-4 z-10">
         <a href={developerWhatsAppUrl} target="_blank" rel="noopener noreferrer" className={`group inline-flex items-center justify-center gap-3 w-full sm:w-auto px-6 py-3 font-bold rounded-full transition-all duration-300 transform hover:scale-105 mb-4 ${footerLinkThemeClasses}`}>
            Quer um site incrível como esse? Fale comigo! 🚀
         </a>
        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-300'}`}>Desenvolvido por <a href="https://www.instagram.com/inteligenciarte.ia" target="_blank" rel="noopener noreferrer" className={`font-semibold ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-200 hover:text-white'} transition-colors`}>InteligenciArte.IA ✨</a></p>
      </footer>
      
      <Modal isOpen={activeModal === 'whatsapp'} onClose={() => { setActiveModal(null); resetWhatsappForm(); }} theme={theme}>
        <div className="text-center">
           <WhatsAppIcon className={`mx-auto h-12 w-12 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`} />
          <h3 className={`mt-2 text-2xl font-bold ${animatedTextClass}`}>Fale com a gente!</h3>
          <p className={`mt-2 text-sm ${subTextColor}`}>Viu algo que gostou ou tem alguma dúvida? Preencha os campos abaixo e nos chame no WhatsApp!</p>
        </div>
        <div className="mt-6 space-y-4 text-left">
           <input type="text" placeholder="Seu nome" value={whatsappName} onChange={e => setWhatsappName(e.target.value)} className={inputClasses} />
           <input type="text" placeholder="Sua idade" value={whatsappAge} onChange={e => setWhatsappAge(e.target.value)} className={inputClasses} />
           <div>
              <label className={`text-sm font-medium ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}`}>Tamanho de roupa (opcional):</label>
              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
                  {['PP', 'P', 'M', 'G', 'GG'].map(size => (
                      <label key={size} className={`flex items-center space-x-2 ${theme === 'dark' ? 'text-white' : 'text-black'} text-sm cursor-pointer`}>
                          <input type="checkbox" checked={whatsappSize.includes(size)} onChange={() => handleWhatsappSizeChange(size)} className={checkboxClasses} />
                          <span>{size}</span>
                      </label>
                  ))}
              </div>
            </div>
           <textarea placeholder="O que está buscando?" value={whatsappQuery} onChange={e => setWhatsappQuery(e.target.value)} rows={3} className={`${inputClasses} resize-none`}></textarea>
        </div>
        <button onClick={handleWhatsAppSubmit} className={`mt-6 ${mainButtonBaseClasses} ${mainButtonThemeClasses}`}>Enviar para WhatsApp <WhatsAppIcon className="h-5 w-5"/></button>
      </Modal>

      <Modal isOpen={activeModal === 'rating'} onClose={() => setActiveModal(null)} theme={theme}>
        <div className="text-center">
          <StarIcon className="mx-auto h-12 w-12 text-yellow-400" />
          <h3 className={`mt-2 text-2xl font-bold ${animatedTextClass}`}>Sua opinião é importante!</h3>
          <p className={`mt-2 text-sm ${subTextColor}`}>Como você avalia sua experiência com a Moda&CIA?</p>
        </div>
        <div className="mt-6 flex justify-center"><RatingStars onRate={handleRatingSubmit} theme={theme} /></div>
        <p className={`mt-4 text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} text-center`}>Sua avaliação nos ajuda a melhorar sempre.</p>
      </Modal>

      <Modal isOpen={activeModal === 'feedback'} onClose={() => setActiveModal(null)} theme={theme}>
        <div className="text-center">
           <h3 className={`text-2xl font-bold ${animatedTextClass}`}>{feedbackContent.title}</h3>
          <p className={`mt-2 text-sm ${subTextColor}`}>{feedbackContent.message}</p>
        </div>
        <form action="https://formsubmit.co/SEU_EMAIL_AQUI" method="POST" className="mt-6 space-y-4">
           <input type="hidden" name="_subject" value={`Feedback ${rating} Estrela(s) - Moda&CIA`} />
           <textarea name="feedback" placeholder="Sua mensagem..." rows={4} required className={`${inputClasses} resize-none`}></textarea>
           <button type="submit" className={`w-full font-bold py-3 px-4 rounded-lg transition-colors duration-300 ${secondaryButtonBg}`}>Enviar Feedback</button>
        </form>
      </Modal>
      
      <Modal isOpen={activeModal === 'location'} onClose={() => setActiveModal(null)} theme={theme}>
        <div className="text-center">
          <LocationIcon className={`mx-auto h-10 w-10 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`} />
          <h3 className={`mt-2 text-2xl font-bold ${animatedTextClass}`}>Nossa Localização</h3>
          <p className={`mt-1 text-sm ${subTextColor}`}>R. Saldanha Marinho, 1120 - Centro, Ponta Grossa - PR</p>
        </div>
        <div className="mt-4 overflow-hidden rounded-lg">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.2122134209644!2d-50.12247002462161!3d-25.09467677777703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94e81b1caef6852b%3A0xf3f4bb525ea12974!2sModa%20e%20Cia!5e0!3m2!1spt-BR!2sbr!4v1756956674877!5m2!1spt-BR!2sbr" width="100%" height="250" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <a href="https://maps.app.goo.gl/jsanFHiCcbWjH4BN7" target="_blank" rel="noopener noreferrer" className={`mt-6 ${mainButtonBaseClasses} ${mainButtonThemeClasses}`}>Ver no Google Maps</a>
      </Modal>

      <Modal isOpen={activeModal === 'catalogList'} onClose={() => setActiveModal(null)} theme={theme}>
        <h3 className={`text-2xl font-bold text-center mb-6 ${animatedTextClass}`}>Top 10 da Temporada</h3>
        <div className="grid grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2">
          {CATALOG_ITEMS.map(item => (
            <div key={item.id} onClick={() => openCatalogItem(item)} className="cursor-pointer group">
              <div className={`${theme === 'dark' ? 'bg-neutral-800/50' : 'bg-white/95 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow duration-300'} rounded-lg p-2`}>
                  <img src={item.images[0]} alt={item.name} className="w-full h-32 object-cover rounded-md mb-2"/>
                  <h4 className={`font-bold text-sm truncate ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{item.name}</h4>
                  <p className={`text-xs ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'}`}>{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </Modal>

      {selectedItem && (
        <Modal isOpen={activeModal === 'catalogDetail'} onClose={() => setActiveModal('catalogList')} theme={theme}>
          <ImageSlider images={selectedItem.images} theme={theme} />
          <h3 className={`text-xl font-bold mt-4 ${animatedTextClass}`}>{selectedItem.name}</h3>
          <p className={`text-lg font-semibold mt-1 ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}`}>{selectedItem.price}</p>
          <p className={`text-sm mt-2 h-20 overflow-y-auto ${subTextColor}`}>{selectedItem.description}</p>
          <div className="mt-4">
            <h4 className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Tamanhos Disponíveis:</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedItem.availableSizes.map(size => (<span key={size} className={`px-3 py-1 text-xs font-medium rounded-full ${theme === 'dark' ? 'bg-neutral-700/50' : 'bg-black/10 text-gray-800'}`}>{size}</span>))}
            </div>
          </div>
          <div className="flex gap-4 mt-6">
             <button onClick={() => setActiveModal('catalogList')} className={`w-1/2 font-bold py-3 px-4 rounded-lg transition-colors duration-300 ${secondaryButtonBg}`}>Voltar</button>
             <button onClick={() => { setCatalogFormSize(selectedItem.availableSizes[0] || ''); setActiveModal('catalogForm'); }} className={`w-1/2 ${mainButtonBaseClasses} ${mainButtonThemeClasses}`}>Tenho Interesse</button>
          </div>
        </Modal>
      )}

      {selectedItem && (
        <Modal isOpen={activeModal === 'catalogForm'} onClose={() => {setActiveModal(null); resetCatalogForm();}} theme={theme}>
          <h3 className={`text-xl font-bold text-center ${animatedTextClass}`}>Interesse em: <br/> {selectedItem.name}</h3>
          <div className="mt-6 space-y-3 text-left">
            <input type="text" placeholder="Seu nome" value={catalogFormName} onChange={e => setCatalogFormName(e.target.value)} className={inputClasses} />
            <input type="text" placeholder="Sua idade" value={catalogFormAge} onChange={e => setCatalogFormAge(e.target.value)} className={inputClasses} />
            <select value={catalogFormSize} onChange={e => setCatalogFormSize(e.target.value)} className={`${inputClasses} appearance-none`}><option value="" disabled>Selecione o tamanho</option>{selectedItem.availableSizes.map(s => <option key={s} value={s}>{s}</option>)}</select>
            <div>
                <label className={`text-sm font-medium ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}`}>Forma de Pagamento:</label>
                <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
                    {['Pix', 'Cartão de Crédito', 'Dinheiro'].map(method => (<label key={method} className={`flex items-center space-x-2 ${theme === 'dark' ? 'text-white' : 'text-black'} text-sm cursor-pointer`}><input type="checkbox" checked={catalogFormPayment.includes(method)} onChange={() => handlePaymentChange(method)} className={checkboxClasses} /><span>{method}</span></label>))}
                </div>
            </div>
            <textarea placeholder="Observações (opcional)" value={catalogFormNotes} onChange={e => setCatalogFormNotes(e.target.value)} rows={2} className={`${inputClasses} resize-none`}></textarea>
          </div>
          <button onClick={handleCatalogInquirySubmit} className={`mt-6 ${mainButtonBaseClasses} ${mainButtonThemeClasses}`}>Enviar Interesse <WhatsAppIcon className="h-5 w-5"/></button>
        </Modal>
      )}
    </div>
  );
};

export default App;
