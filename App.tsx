import React, { useState, useEffect } from 'react';
import { QUOTES } from './constants/quotes';
import { CATALOG_ITEMS, CatalogItem } from './constants/catalogItems';
import LinkButton from './components/LinkButton';
import Modal from './components/Modal';
import RatingStars from './components/RatingStars';
import ImageSlider from './components/ImageSlider';
import { InstagramIcon, CatalogIcon, WhatsAppIcon, GoogleIcon, StarIcon, LocationIcon } from './components/Icons';

type ModalType = 'whatsapp' | 'rating' | 'feedback' | 'catalogList' | 'catalogDetail' | 'catalogForm' | 'location' | null;

const App: React.FC = () => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [rating, setRating] = useState(0);

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

  const handleCoinClick = () => {
    if (isFlipping) return;

    setIsFlipping(true);
    // Add 5 full spins (1800deg) + a random half spin (0 or 180deg) for the result
    const newRotation = rotation + 1800 + (Math.random() < 0.5 ? 0 : 180);
    setRotation(newRotation);

    setTimeout(() => {
        setIsFlipping(false);
    }, 1200); // Match CSS transition duration
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
      case 3: return { title: "Conte-nos um pouco mais", message: "Agradecemos seu feedback. Gostaríamos de entender melhor sua perspectiva para aprimorar nossos serviços e produtos." };
      case 4: return { title: "Obrigado pelo seu tempo!", message: `Ficamos felizes que tenha gostado, mas queremos sempre ir além. Como podemos transformar sua avaliação de ${rating} em 5 estrelas?` };
      default: return { title: "Que pena!", message: "Conte-nos como podemos melhorar. Seu feedback é muito valioso!" };
    }
  };

  const developerWhatsAppUrl = `https://wa.me/5541988710303?text=${encodeURIComponent('Olá, vi o link da Moda&CIA e quero um site igual!')}`;
  const feedbackContent = getFeedbackContent(rating);

  return (
    <div className="relative min-h-screen w-full bg-black flex flex-col items-center justify-between p-4 sm:p-6 font-sans">
      <div className="wavy-background"></div>
      
      <main className="w-full max-w-md mx-auto flex flex-col items-center justify-center flex-grow z-10">
        <div className="w-full rounded-3xl p-px bg-animated-border shadow-2xl shadow-neutral-800/20">
          <div className="relative overflow-hidden w-full h-full bg-black/40 backdrop-blur-lg rounded-[23px] p-6 sm:p-8 text-white">
             <img
              src="/logo1.png"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover opacity-[0.03] pointer-events-none"
            />
            <header className="relative flex flex-col items-center text-center">
              <div className="flex justify-center mb-6">
                <div
                    className="coin-wrapper"
                    onClick={handleCoinClick}
                    role="button"
                    aria-label="Jogue a moeda da sorte"
                    tabIndex={0}
                >
                    <div className="coin w-28 h-28" style={{ transform: `rotateY(${rotation}deg)` }}>
                        {/* Front Face */}
                        <div className="coin-face w-full h-full rounded-full">
                           <img src="/moeda.png" alt="Moeda da Sorte - Cara" className="w-full h-full rounded-full object-cover" />
                        </div>
                        {/* Back Face */}
                        <div className="coin-face coin-back w-full h-full rounded-full">
                           <img src="/moeda.png" alt="Moeda da Sorte - Coroa" className="w-full h-full rounded-full object-cover" />
                        </div>
                    </div>
                </div>
              </div>

              <img src="/logo.png" alt="Logotipo Moda&CIA" className="h-20 sm:h-24 mx-auto py-1" />

              <div className="h-12 sm:h-14 mt-4 flex items-center justify-center">
                 <p className="text-lg sm:text-xl font-bold tracking-wider px-4 animate-silver-text">
                  {QUOTES[0]}
                </p>
              </div>
            </header>

            <section className="relative mt-6 sm:mt-8 space-y-4">
              <LinkButton href="https://www.instagram.com/moda.cia.pg/" text="Instagram" icon={<InstagramIcon />} />
              <LinkButton onClick={() => setActiveModal('catalogList')} text="Catálogo" icon={<CatalogIcon />} />
              <LinkButton onClick={() => setActiveModal('whatsapp')} text="Contato" icon={<WhatsAppIcon />} />
              <LinkButton onClick={() => setActiveModal('location')} text="Localização" icon={<LocationIcon />} />
              <LinkButton onClick={() => setActiveModal('rating')} text="Avalie nossa loja" icon={<GoogleIcon />} />
            </section>
          </div>
        </div>
      </main>

      <footer className="w-full max-w-md mx-auto text-center text-gray-400 text-sm mt-8 pb-4 z-10">
         <div className="w-full sm:w-auto rounded-full p-px bg-animated-border transition-all duration-300 hover:shadow-gray-400/20 mb-4 transform hover:scale-105">
            <a href={developerWhatsAppUrl} target="_blank" rel="noopener noreferrer" className="group animate-silver-text inline-flex items-center justify-center gap-3 w-full px-6 py-3 bg-neutral-900/80 font-bold rounded-full">
              Quer um site incrível como esse? Fale comigo! 🚀
            </a>
        </div>
        <p>Desenvolvido por <a href="https://www.instagram.com/inteligenciarte.ia" target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-300 hover:text-white transition-colors">InteligenciArte.IA ✨</a></p>
      </footer>
      
      {/* WhatsApp Modal */}
      <Modal isOpen={activeModal === 'whatsapp'} onClose={() => { setActiveModal(null); resetWhatsappForm(); }}>
        <div className="text-center">
           <WhatsAppIcon className="mx-auto h-12 w-12 text-gray-300" />
          <h3 className="mt-2 text-2xl font-bold animate-silver-text">Fale com a gente!</h3>
          <p className="mt-2 text-sm text-gray-400">Viu algo que gostou ou tem alguma dúvida? Preencha os campos abaixo e nos chame no WhatsApp!</p>
        </div>
        <div className="mt-6 space-y-4 text-left">
           <div className="rounded-lg p-px bg-animated-border focus-within:shadow-lg focus-within:shadow-gray-400/40 transition-shadow duration-300"><input type="text" placeholder="Seu nome" value={whatsappName} onChange={e => setWhatsappName(e.target.value)} className="w-full bg-neutral-800/50 border-none rounded-[7px] px-4 py-2 text-white placeholder-neutral-400 focus:outline-none" /></div>
           <div className="rounded-lg p-px bg-animated-border focus-within:shadow-lg focus-within:shadow-gray-400/40 transition-shadow duration-300"><input type="text" placeholder="Sua idade" value={whatsappAge} onChange={e => setWhatsappAge(e.target.value)} className="w-full bg-neutral-800/50 border-none rounded-[7px] px-4 py-2 text-white placeholder-neutral-400 focus:outline-none" /></div>
           <div>
              <label className="text-sm font-medium text-neutral-300">Tamanho de roupa (opcional):</label>
              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
                  {['PP', 'P', 'M', 'G', 'GG'].map(size => (
                      <label key={size} className="flex items-center space-x-2 text-white text-sm cursor-pointer">
                          <input
                              type="checkbox"
                              checked={whatsappSize.includes(size)}
                              onChange={() => handleWhatsappSizeChange(size)}
                              className="form-checkbox h-4 w-4 rounded bg-neutral-700 border-neutral-600 text-gray-400 focus:ring-gray-400"
                          />
                          <span>{size}</span>
                      </label>
                  ))}
              </div>
            </div>
           <div className="rounded-lg p-px bg-animated-border focus-within:shadow-lg focus-within:shadow-gray-400/40 transition-shadow duration-300"><textarea placeholder="O que está buscando? (Ex: Vi algo no Instagram, busco vestidos, etc.)" value={whatsappQuery} onChange={e => setWhatsappQuery(e.target.value)} rows={3} className="w-full bg-neutral-800/50 border-none rounded-[7px] px-4 py-2 text-white placeholder-neutral-400 focus:outline-none resize-none"></textarea></div>
        </div>
        <button onClick={handleWhatsAppSubmit} className="mt-6 w-full bg-gradient-to-r from-neutral-800 via-neutral-900 to-black text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-gray-400/40 transform hover:scale-105 flex items-center justify-center gap-2">Enviar para WhatsApp <WhatsAppIcon className="h-5 w-5"/></button>
      </Modal>

      {/* Rating Modal */}
      <Modal isOpen={activeModal === 'rating'} onClose={() => setActiveModal(null)}>
        <div className="text-center">
          <StarIcon className="mx-auto h-12 w-12 text-yellow-400" />
          <h3 className="mt-2 text-2xl font-bold animate-silver-text">Sua opinião é importante!</h3>
          <p className="mt-2 text-sm text-gray-400">Como você avalia sua experiência com a Moda&CIA?</p>
        </div>
        <div className="mt-6 flex justify-center"><RatingStars onRate={handleRatingSubmit} /></div>
        <p className="mt-4 text-xs text-gray-500 text-center">Sua avaliação nos ajuda a melhorar sempre.</p>
      </Modal>

      {/* Feedback Modal */}
      <Modal isOpen={activeModal === 'feedback'} onClose={() => setActiveModal(null)}>
        <div className="text-center">
           <h3 className="text-2xl font-bold animate-silver-text">{feedbackContent.title}</h3>
          <p className="mt-2 text-sm text-gray-400">{feedbackContent.message}</p>
        </div>
        <form action="https://formsubmit.co/SEU_EMAIL_AQUI" method="POST" className="mt-6 space-y-4">
           <input type="hidden" name="_subject" value={`Feedback ${rating} Estrela(s) - Moda&CIA`} />
           <div className="rounded-lg p-px bg-animated-border focus-within:shadow-lg focus-within:shadow-gray-400/40 transition-shadow duration-300"><textarea name="feedback" placeholder="Sua mensagem..." rows={4} required className="w-full bg-neutral-800/50 border-none rounded-[7px] px-4 py-2 text-white placeholder-neutral-400 focus:outline-none resize-none"></textarea></div>
           <button type="submit" className="w-full bg-neutral-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-neutral-600 transition-colors duration-300">Enviar Feedback</button>
        </form>
      </Modal>
      
      {/* Location Modal */}
      <Modal isOpen={activeModal === 'location'} onClose={() => setActiveModal(null)}>
        <div className="text-center">
          <LocationIcon className="mx-auto h-10 w-10 text-gray-300" />
          <h3 className="mt-2 text-2xl font-bold animate-silver-text">Nossa Localização</h3>
          <p className="mt-1 text-sm text-gray-400">R. Saldanha Marinho, 1120 - Centro, Ponta Grossa - PR</p>
        </div>
        <div className="mt-4 rounded-lg p-px bg-animated-border">
          <div className="overflow-hidden rounded-[7px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.2122134209644!2d-50.12247002462161!3d-25.09467677777703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94e81b1caef6852b%3A0xf3f4bb525ea12974!2sModa%20e%20Cia!5e0!3m2!1spt-BR!2sbr!4v1756956674877!5m2!1spt-BR!2sbr"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <a
          href="https://maps.app.goo.gl/jsanFHiCcbWjH4BN7"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 w-full bg-gradient-to-r from-neutral-800 via-neutral-900 to-black text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-gray-400/40 transform hover:scale-105 flex items-center justify-center gap-2"
        >
          Ver no Google Maps
        </a>
      </Modal>

      {/* Catalog List Modal */}
      <Modal isOpen={activeModal === 'catalogList'} onClose={() => setActiveModal(null)}>
        <h3 className="text-2xl font-bold text-center mb-6 animate-silver-text">Top 10 da Temporada</h3>
        <div className="grid grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2">
          {CATALOG_ITEMS.map(item => (
            <div key={item.id} onClick={() => openCatalogItem(item)} className="cursor-pointer group">
              <div className="rounded-lg p-px bg-animated-border"><div className="bg-neutral-800/50 rounded-[7px] p-2">
                  <img src={item.images[0]} alt={item.name} className="w-full h-32 object-cover rounded-md mb-2"/>
                  <h4 className="font-bold text-sm truncate text-white">{item.name}</h4>
                  <p className="text-xs text-neutral-300">{item.price}</p>
              </div></div>
            </div>
          ))}
        </div>
      </Modal>

      {/* Catalog Detail Modal */}
      {selectedItem && (
        <Modal isOpen={activeModal === 'catalogDetail'} onClose={() => setActiveModal('catalogList')}>
          <ImageSlider images={selectedItem.images} />
          <h3 className="text-xl font-bold mt-4 animate-silver-text">{selectedItem.name}</h3>
          <p className="text-lg font-semibold text-neutral-300 mt-1">{selectedItem.price}</p>
          <p className="text-sm text-gray-400 mt-2 h-20 overflow-y-auto">{selectedItem.description}</p>
          <div className="mt-4">
            <h4 className="text-sm font-semibold text-white">Tamanhos Disponíveis:</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedItem.availableSizes.map(size => (
                <span key={size} className="px-3 py-1 bg-neutral-700/50 text-xs font-medium rounded-full">{size}</span>
              ))}
            </div>
          </div>
          <div className="flex gap-4 mt-6">
             <button onClick={() => setActiveModal('catalogList')} className="w-1/2 bg-neutral-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-neutral-600 transition-colors duration-300">Voltar</button>
             <button onClick={() => { setCatalogFormSize(selectedItem.availableSizes[0] || ''); setActiveModal('catalogForm'); }} className="w-1/2 bg-gradient-to-r from-neutral-800 via-neutral-900 to-black text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-gray-400/40 transform hover:scale-105">Tenho Interesse</button>
          </div>
        </Modal>
      )}

      {/* Catalog Form Modal */}
      {selectedItem && (
        <Modal isOpen={activeModal === 'catalogForm'} onClose={() => {setActiveModal(null); resetCatalogForm();}}>
          <h3 className="text-xl font-bold text-center animate-silver-text">Interesse em: <br/> {selectedItem.name}</h3>
          <div className="mt-6 space-y-3 text-left">
            <div className="rounded-lg p-px bg-animated-border"><input type="text" placeholder="Seu nome" value={catalogFormName} onChange={e => setCatalogFormName(e.target.value)} className="w-full bg-neutral-800/50 border-none rounded-[7px] px-4 py-2 text-white placeholder-neutral-400 focus:outline-none" /></div>
            <div className="rounded-lg p-px bg-animated-border"><input type="text" placeholder="Sua idade" value={catalogFormAge} onChange={e => setCatalogFormAge(e.target.value)} className="w-full bg-neutral-800/50 border-none rounded-[7px] px-4 py-2 text-white placeholder-neutral-400 focus:outline-none" /></div>
            <div className="rounded-lg p-px bg-animated-border"><select value={catalogFormSize} onChange={e => setCatalogFormSize(e.target.value)} className="w-full bg-neutral-800/50 border-none rounded-[7px] px-4 py-2 text-white focus:outline-none appearance-none"><option value="" disabled>Selecione o tamanho</option>{selectedItem.availableSizes.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
            <div>
                <label className="text-sm font-medium text-neutral-300">Forma de Pagamento:</label>
                <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
                    {['Pix', 'Cartão de Crédito', 'Dinheiro'].map(method => (
                        <label key={method} className="flex items-center space-x-2 text-white text-sm cursor-pointer"><input type="checkbox" checked={catalogFormPayment.includes(method)} onChange={() => handlePaymentChange(method)} className="form-checkbox h-4 w-4 rounded bg-neutral-700 border-neutral-600 text-gray-400 focus:ring-gray-400" /><span>{method}</span></label>
                    ))}
                </div>
            </div>
            <div className="rounded-lg p-px bg-animated-border"><textarea placeholder="Observações (opcional)" value={catalogFormNotes} onChange={e => setCatalogFormNotes(e.target.value)} rows={2} className="w-full bg-neutral-800/50 border-none rounded-[7px] px-4 py-2 text-white placeholder-neutral-400 focus:outline-none resize-none"></textarea></div>
          </div>
          <button onClick={handleCatalogInquirySubmit} className="mt-6 w-full bg-gradient-to-r from-neutral-800 via-neutral-900 to-black text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-gray-400/40 transform hover:scale-105 flex items-center justify-center gap-2">Enviar Interesse <WhatsAppIcon className="h-5 w-5"/></button>
        </Modal>
      )}
    </div>
  );
};

export default App;
