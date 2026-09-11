import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, Route, Routes, useLocation, useParams } from 'react-router-dom'
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Menu,
  Phone,
  ShieldCheck,
  X,
} from 'lucide-react'
import { faqs, products, whatsappUrl, workImages, workVideos } from './data'

const siteUrl = 'https://novaprecil.com.br'

function Seo({ title, description, path = '/', type = 'website', image = '/assets/team.webp', noIndex = false, children }) {
  const fullTitle = title ? `${title} – Nova Precil` : 'Nova Precil – Pré Moldados de Concreto'
  const canonical = `${siteUrl}${path}`
  const absoluteImage = image.startsWith('http') ? image : `${siteUrl}${image}`

  return (
    <Helmet>
      <html lang="pt-BR" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noIndex ? 'noindex, follow' : 'index, follow, max-image-preview:large'} />
      <link rel="canonical" href={canonical} />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="Nova Precil" />
      <meta property="og:image" content={absoluteImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />
      {children}
    </Helmet>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname, location.hash])

  const homeAnchor = (hash) => (location.pathname === '/' ? hash : `/${hash}`)

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/" aria-label="Nova Precil - Página inicial">
          <img src="/assets/logo-nova-precil.png" alt="Nova Precil - Pré-moldados de concreto" />
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </button>

        <nav className={open ? 'main-nav is-open' : 'main-nav'} aria-label="Navegação principal">
          <Link to="/">Inicio</Link>
          <Link to={homeAnchor('#sobre')}>Sobre Nós</Link>
          <Link to={homeAnchor('#produtos')}>Produtos</Link>
          <Link to="/obras/">Obras</Link>
          <a className="button button-header" href={whatsappUrl} target="_blank" rel="noreferrer">
            Realize seu orçamento
          </a>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-content">
          <div className="footer-info">
            <h2>Links úteis:</h2>
            <Link to="/contato/">
              <MessageCircle /> Contato
            </Link>
            <Link to="/politica-de-privacidade/">
              <ShieldCheck /> Política de Privacidade
            </Link>
            <a href="mailto:diretoria@novaprecil.com.br">
              <Mail /> diretoria@novaprecil.com.br
            </a>
            <a href="tel:+556332177000">
              <Phone /> (63) 3217-7000
            </a>

            <h2>Redes Sociais:</h2>
            <a href="https://www.instagram.com/novaprecil/" target="_blank" rel="noreferrer">
              <Instagram /> @novaprecil
            </a>
            <a href="https://www.facebook.com/novapreciloficial" target="_blank" rel="noreferrer">
              <Facebook /> @novapreciloficial
            </a>

            <h2>Endereço:</h2>
            <a href="https://maps.google.com/?q=Nova+Precil+Palmas+TO" target="_blank" rel="noreferrer">
              <MapPin /> 412 norte, Al. 02, Qi. 04, Lts. 18 à 22 / Palmas-TO
            </a>

            <h2>Dados da empresa:</h2>
            <dl className="footer-company-data">
              <div>
                <dt>CNPJ:</dt>
                <dd>26.754.497/0001-27</dd>
              </div>
              <div>
                <dt>Razão Social:</dt>
                <dd>Premais Fabricacao de Premoldados LTDA</dd>
              </div>
              <div>
                <dt>Nome Fantasia:</dt>
                <dd>Nova Precil</dd>
              </div>
            </dl>
          </div>

          <iframe
            className="footer-map"
            title="Localização da Nova Precil em Palmas"
            src="https://www.google.com/maps?q=Nova%20Precil%2C%20Palmas%20TO&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <p className="copyright">
          <span>Nova Precil</span> / Copyright© 2015-{new Date().getFullYear()} All Rights Reserved
        </p>
      </div>
    </footer>
  )
}

function WhatsAppWidget() {
  const [open, setOpen] = useState(false)

  return (
    <div className="whatsapp-widget">
      {open && (
        <div className="whatsapp-popover" role="dialog" aria-label="Atendimento por WhatsApp">
          <button type="button" onClick={() => setOpen(false)} aria-label="Fechar atendimento">
            <X />
          </button>
          <span>Olá, 👋</span>
          <strong>Como podemos te ajudar?</strong>
          <a href={whatsappUrl} target="_blank" rel="noreferrer">
            Iniciar atendimento
          </a>
        </div>
      )}
      <button
        className="whatsapp-button"
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Precisa de ajuda? Fale pelo WhatsApp"
      >
        <img src="/assets/whatsapp.svg" alt="" aria-hidden="true" />
      </button>
    </div>
  )
}

function CookieBanner() {
  const storageKey = 'nova-precil-cookie-consent'
  const [visible, setVisible] = useState(() => {
    try {
      return window.localStorage.getItem(storageKey) !== 'accepted'
    } catch {
      return true
    }
  })

  const acceptCookies = () => {
    try {
      window.localStorage.setItem(storageKey, 'accepted')
    } catch {
      // O aviso ainda pode ser fechado quando o armazenamento do navegador estiver indisponível.
    }

    setVisible(false)
  }

  if (!visible) return null

  return (
    <aside className="cookie-banner" aria-label="Aviso sobre cookies">
      <div className="cookie-banner-inner">
        <p>
          Este site utiliza cookies para melhorar sua experiência de navegação. Ao continuar, você concorda com nossa{' '}
          <Link to="/politica-de-privacidade/">Política de Privacidade</Link>.
        </p>
        <button type="button" onClick={acceptCookies}>
          Aceitar e continuar
        </button>
      </div>
    </aside>
  )
}

function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <CookieBanner />
      <WhatsAppWidget />
    </>
  )
}

function ProductCard({ product, linkTitle = false }) {
  return (
    <article className="product-card">
      {linkTitle ? (
        <Link to={`/produtos/${product.slug}/`} className="product-image-link" aria-label={`Ver ${product.name}`}>
          <img src={product.image} alt={product.name} loading="lazy" width="1024" height="796" />
        </Link>
      ) : (
        <img src={product.image} alt={product.name} loading="lazy" width="1024" height="796" />
      )}
      <div className="product-name">
        {linkTitle ? <Link to={`/produtos/${product.slug}/`}>{product.name}</Link> : product.name}
      </div>
      <a href={whatsappUrl} target="_blank" rel="noreferrer" className="product-order">
        Realizar pedido
      </a>
    </article>
  )
}

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-video" aria-hidden="true">
        <iframe
          src="https://www.youtube-nocookie.com/embed/dwKWN3m0yNU?autoplay=1&mute=1&controls=0&loop=1&playlist=dwKWN3m0yNU&rel=0&modestbranding=1&playsinline=1"
          title="Nova Precil"
          tabIndex="-1"
          allow="autoplay; encrypted-media"
        />
      </div>
      <div className="hero-overlay" />
      <div className="hero-content page-container">
        <h1 id="hero-title">Concreto é nosso desejo por um 🇧🇷 cada vez maior</h1>
        <p>Descubra como nossos pré-moldados de concreto podem impulsionar seus projetos de construção.</p>
      </div>
      <img className="hero-divider" src="/assets/hero-divider.png" alt="" aria-hidden="true" />
    </section>
  )
}

function About() {
  const cards = [
    {
      title: 'Nossa missão é clara',
      text: 'Fabricar e entregar produtos de alta qualidade de forma rápida e eficiente. Comprometemo-nos a oferecer excelência no atendimento ao cliente, mantendo nossa posição de referência na região norte do país.',
    },
    {
      title: 'Na Nova Precil',
      text: 'Aspiramos a ser líderes inovadores no segmento de artefatos de concreto. Buscamos conquistar nossos clientes através do atendimento excepcional, padronização e qualidade de nossos produtos.',
    },
    {
      title: 'Nossa política de qualidade',
      text: 'Buscamos constantemente alcançar requisitos, padronizar processos e melhorar nosso sistema de gestão da qualidade para garantir a satisfação do cliente.',
    },
  ]

  return (
    <section className="about section-white" id="sobre" aria-labelledby="about-title">
      <div className="page-container">
        <div className="about-grid">
          <div className="about-copy">
            <h2 id="about-title">Sobre Nós</h2>
            <p>
              Na <strong>Nova Precil</strong>, tradição é mais do que uma palavra – é o alicerce sobre o qual construímos
              nossa reputação. Desde nossa <strong>fundação em 1989</strong>, temos sido sinônimo de seriedade,
              comprometimento e qualidade em todo o Tocantins.
            </p>
            <a className="button" href={whatsappUrl} target="_blank" rel="noreferrer">
              Realize seu orçamento
            </a>
          </div>
          <img className="team-image" src="/assets/team.webp" alt="Equipe Nova Precil" width="1400" height="1052" />
        </div>

        <div className="values-grid">
          {cards.map((card) => (
            <article className="value-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductsSection() {
  return (
    <section className="products-section section-white" id="produtos" aria-labelledby="products-title">
      <div className="products-container">
        <h2 id="products-title">Portifólio de Produtos</h2>
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard product={product} key={product.slug} />
          ))}
        </div>
      </div>
      <img className="products-divider" src="/assets/products-divider.png" alt="" aria-hidden="true" />
    </section>
  )
}

function AnimatedQualitySeal() {
  const enableSealMotion = (event) => {
    const svgDocument = event.currentTarget.contentDocument

    if (!svgDocument || svgDocument.getElementById('nova-precil-seal-motion')) return

    const motionStyles = svgDocument.createElementNS('http://www.w3.org/2000/svg', 'style')
    motionStyles.id = 'nova-precil-seal-motion'
    motionStyles.textContent = `
      #arco_selo {
        animation: seal-clockwise 20s linear infinite;
        transform-box: view-box;
        transform-origin: center;
      }

      #base-selo-01 {
        animation: seal-clockwise 60s linear infinite;
        transform-box: view-box;
        transform-origin: center;
      }

      #circulo_01 {
        animation: seal-counterclockwise 40s linear infinite;
        transform-box: view-box;
        transform-origin: center;
      }

      @keyframes seal-clockwise {
        from { transform: rotate(360deg); }
        to { transform: rotate(0deg); }
      }

      @keyframes seal-counterclockwise {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      @media (prefers-reduced-motion: reduce) {
        #arco_selo,
        #base-selo-01,
        #circulo_01 { animation: none; }
      }
    `

    svgDocument.documentElement.prepend(motionStyles)
  }

  return (
    <object
      className="quality-seal"
      data="/assets/selo.svg"
      type="image/svg+xml"
      aria-label="Selo alto padrão de qualidade"
      onLoad={enableSealMotion}
    >
      <img src="/assets/selo.svg" alt="Selo alto padrão de qualidade" width="540" height="543" />
    </object>
  )
}

function Quality() {
  return (
    <section className="quality" aria-labelledby="quality-title">
      <div className="quality-inner page-container">
        <AnimatedQualitySeal />
        <div>
          <h2 id="quality-title">Excelência em qualidade</h2>
          <p>
            Estamos constantemente em busca de melhorias, investindo em novas tecnologias, descobrindo novas maneiras
            de produzir desenvolvendo novas soluções.
          </p>
          <p>Seguindo a tendência dos novos tempos, aliada à respeitada história da empresa e ao seu rico portifólio.</p>
        </div>
      </div>
    </section>
  )
}

function Faq() {
  const [active, setActive] = useState(-1)

  return (
    <section className="faq-section" aria-labelledby="faq-title">
      <div className="faq-inner page-container">
        <div className="faq-heading">
          <img src="/assets/faq-illustration.png" alt="FAQ" />
          <h2 id="faq-title">Dúvidas Frequentes</h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => {
            const isOpen = active === index
            return (
              <article className={isOpen ? 'faq-item is-open' : 'faq-item'} key={faq.question}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() => setActive(isOpen ? -1 : index)}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown />
                  </button>
                </h3>
                <div
                  className="faq-answer"
                  id={`faq-answer-${index}`}
                  aria-hidden={!isOpen}
                  role="region"
                >
                  <div className="faq-answer-inner">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function HomePage() {
  const description =
    'Descubra os pré-moldados de concreto da Nova Precil. Tradição desde 1989, qualidade, variedade e entrega rápida em Palmas e na região Norte.'
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `${siteUrl}/#organization`,
        name: 'Nova Precil',
        url: siteUrl,
        logo: `${siteUrl}/assets/logo-nova-precil.png`,
        telephone: '+55 63 3217-7000',
        email: 'diretoria@novaprecil.com.br',
        foundingDate: '1989',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '412 norte, Al. 02, Qi. 04, Lts. 18 à 22',
          addressLocality: 'Palmas',
          addressRegion: 'TO',
          addressCountry: 'BR',
        },
        areaServed: ['Tocantins', 'Pará', 'Maranhão', 'Região Norte do Brasil'],
        sameAs: ['https://www.instagram.com/novaprecil/', 'https://www.facebook.com/novapreciloficial'],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
      {
        '@type': 'ItemList',
        name: 'Portifólio de Produtos Nova Precil',
        itemListElement: products.map((product, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${siteUrl}/produtos/${product.slug}/`,
          name: product.name,
        })),
      },
    ],
  }

  return (
    <Layout>
      <Seo description={description}>
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Seo>
      <Hero />
      <About />
      <ProductsSection />
      <Quality />
      <Faq />
    </Layout>
  )
}

function PageHero({ title, eyebrow, compact = false }) {
  return (
    <section className={compact ? 'page-hero page-hero-compact' : 'page-hero'}>
      <div className="page-container">
        {eyebrow && <span>{eyebrow}</span>}
        <h1>{title}</h1>
      </div>
    </section>
  )
}

function ProductsArchive({ page = 1 }) {
  const pageSize = 10
  const start = (page - 1) * pageSize
  const currentProducts = products.slice(start, start + pageSize)

  return (
    <Layout>
      <Seo
        title={page > 1 ? `Produtos – Página ${page}` : 'Produtos'}
        description="Conheça o portifólio de pré-moldados de concreto da Nova Precil."
        path={page > 1 ? `/produtos/page/${page}/` : '/produtos/'}
      />
      <section className="archive-section archive-original">
        <div className="page-container">
          <h1>Arquivos: Produtos</h1>
          <div className="archive-list">
            {currentProducts.map((product) => (
              <article key={product.slug}>
                <h2>
                  <Link to={`/produtos/${product.slug}/`}>{product.name}</Link>
                </h2>
                <Link to={`/produtos/${product.slug}/`} aria-label={`Ver ${product.name}`}>
                  <img src={product.image} alt={product.name} loading="lazy" width="1024" height="796" />
                </Link>
              </article>
            ))}
          </div>
          <nav className="pagination" aria-label="Paginação de produtos">
            {page > 1 && (
              <Link to="/produtos/">
                <ChevronLeft /> Anterior
              </Link>
            )}
            {start + pageSize < products.length && (
              <Link to="/produtos/page/2/">
                Próximo <ChevronRight />
              </Link>
            )}
          </nav>
        </div>
      </section>
    </Layout>
  )
}

function ProductDetail() {
  const { slug } = useParams()
  const product = products.find((item) => item.slug === slug)

  if (!product) return <NotFound />

  const description = `${product.name} em concreto fabricado pela Nova Precil. Solicite seu orçamento pelo WhatsApp.`

  return (
    <Layout>
      <Seo
        title={product.name}
        description={description}
        path={`/produtos/${product.slug}/`}
        type="product"
        image={product.image}
      >
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            image: `${siteUrl}${product.image}`,
            description,
            brand: { '@type': 'Brand', name: 'Nova Precil' },
          })}
        </script>
      </Seo>
      <PageHero title={product.name} eyebrow="Portifólio de Produtos" />
      <section className="product-detail">
        <div className="page-container product-detail-grid">
          <img src={product.image} alt={product.name} width="1024" height="796" />
          <div>
            <h2>{product.name}</h2>
            <p>
              Produto pré-moldado em concreto fabricado com o padrão de qualidade Nova Precil. Consulte nossa equipe
              para configurações, disponibilidade e prazo de entrega.
            </p>
            <a className="button" href={whatsappUrl} target="_blank" rel="noreferrer">
              Realize seu orçamento
            </a>
          </div>
        </div>
      </section>
    </Layout>
  )
}

function WorksPage() {
  const [selected, setSelected] = useState(null)

  return (
    <Layout>
      <Seo
        title="Obras"
        description="Conheça obras e aplicações realizadas com produtos pré-moldados de concreto da Nova Precil."
        path="/obras/"
        image="/assets/obra-1.jpg"
      />
      <PageHero title="Galeria de Obras" compact />
      <section className="works-section">
        <div className="page-container">
          <div className="works-grid works-grid-top">
            {workImages.slice(0, 5).map((image, index) => (
              <button type="button" key={image} onClick={() => setSelected(image)} aria-label={`Ampliar obra ${index + 1}`}>
                <img src={image} alt={`Obra Nova Precil ${index + 1}`} loading="lazy" />
              </button>
            ))}
          </div>
          <div className="works-videos">
            {workVideos.map((video, index) => (
              <iframe
                key={video}
                src={`https://www.youtube-nocookie.com/embed/${video}`}
                title={`Vídeo de obra Nova Precil ${index + 1}`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ))}
          </div>
          <div className="works-carousel" aria-label="Mais obras Nova Precil">
            {workImages.slice(5).map((image, index) => (
              <button
                type="button"
                key={image}
                onClick={() => setSelected(image)}
                aria-label={`Ampliar obra ${index + 6}`}
              >
                <img src={image} alt={`Obra Nova Precil ${index + 6}`} loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      </section>
      {selected && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Foto ampliada">
          <button type="button" aria-label="Fechar foto" onClick={() => setSelected(null)}>
            <X />
          </button>
          <img src={selected} alt="Obra Nova Precil ampliada" />
        </div>
      )}
    </Layout>
  )
}

function PrivacyPolicyPage() {
  return (
    <Layout>
      <Seo
        title="Política de Privacidade"
        description="Conheça a Política de Privacidade da Nova Precil e saiba como tratamos informações e utilizamos cookies."
        path="/politica-de-privacidade/"
      />
      <PageHero title="Política de Privacidade" eyebrow="Transparência e segurança" compact />
      <section className="privacy-policy">
        <article className="privacy-policy-content page-container">
          <p>
            A sua privacidade é importante para nós. É política do Nova Precil respeitar a sua privacidade em relação a
            qualquer informação sua que possamos coletar no site Nova Precil, e outros sites que possuímos e operamos.
          </p>

          <p>
            Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço.
            Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que
            estamos coletando e como será usado.
          </p>

          <p>
            Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando
            armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem
            como acesso, divulgação, cópia, uso ou modificação não autorizados.
          </p>

          <p>
            Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando
            exigido por lei.
          </p>

          <p>
            O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos
            controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas
            respectivas políticas de privacidade.
          </p>

          <p>
            Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos
            fornecer alguns dos serviços desejados.
          </p>

          <p>
            O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e
            informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações
            pessoais, entre em contacto connosco.
          </p>

          <h2>Cookies e publicidade</h2>

          <p>
            O serviço Google AdSense que usamos para veicular publicidade usa um cookie DoubleClick para veicular
            anúncios mais relevantes em toda a Web e limitar o número de vezes que um determinado anúncio é exibido para
            você.
          </p>

          <p>
            Para mais informações sobre o Google AdSense, consulte as FAQs oficiais sobre privacidade do Google AdSense.
          </p>

          <p>
            Utilizamos anúncios para compensar os custos de funcionamento deste site e fornecer financiamento para
            futuros desenvolvimentos. Os cookies de publicidade comportamental usados por este site foram projetados
            para garantir que você forneça os anúncios mais relevantes sempre que possível, rastreando anonimamente seus
            interesses e apresentando coisas semelhantes que possam ser do seu interesse.
          </p>

          <p>
            Vários parceiros anunciam em nosso nome e os cookies de rastreamento de afiliados simplesmente nos permitem
            ver se nossos clientes acessaram o site através de um dos sites de nossos parceiros, para que possamos
            creditá-los adequadamente e, quando aplicável, permitir que nossos parceiros afiliados ofereçam qualquer
            promoção que pode fornecê-lo para fazer uma compra.
          </p>

          <h2>Compromisso do Usuário</h2>

          <p>
            O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o Nova Precil oferece no site
            e com caráter enunciativo, mas não limitativo:
          </p>

          <ol className="privacy-policy-list" type="A">
            <li>Não se envolver em atividades que sejam ilegais ou contrárias à boa fé a à ordem pública;</li>
            <li>
              Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, jogos de sorte ou azar, qualquer tipo
              de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;
            </li>
            <li>
              Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do Nova Precil, de seus
              fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas
              de hardware ou software que sejam capazes de causar danos anteriormente mencionados.
            </li>
          </ol>

          <h2>Mais informações</h2>

          <p>
            Esperemos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza
            se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que
            você usa em nosso site.
          </p>

          <p className="privacy-policy-effective-date">Esta política é efetiva a partir de Setembro/2026.</p>
        </article>
      </section>
    </Layout>
  )
}

function ContactPage() {
  return (
    <Layout>
      <Seo
        title="Contato"
        description="Entre em contato com a Nova Precil por telefone, WhatsApp ou e-mail e encontre nosso endereço em Palmas, Tocantins."
        path="/contato/"
      />
      <PageHero title="Contato" eyebrow="Fale com a Nova Precil" compact />
      <section className="contact-page">
        <div className="contact-layout page-container">
          <div className="contact-panel">
            <span className="contact-eyebrow">Estamos à disposição</span>
            <h2>Entre em contato</h2>
            <p className="contact-intro">
              Fale com nossa equipe para solicitar um orçamento, tirar dúvidas ou conhecer melhor nossos produtos.
            </p>

            <div className="contact-list">
              <a className="contact-item" href="tel:+556332177000">
                <span className="contact-icon" aria-hidden="true">
                  <Phone />
                </span>
                <span>
                  <strong>Telefone e WhatsApp</strong>
                  <span>(63) 3217-7000</span>
                </span>
              </a>

              <a className="contact-item" href="mailto:diretoria@novaprecil.com.br">
                <span className="contact-icon" aria-hidden="true">
                  <Mail />
                </span>
                <span>
                  <strong>E-mail</strong>
                  <span>diretoria@novaprecil.com.br</span>
                </span>
              </a>

              <a
                className="contact-item"
                href="https://maps.google.com/?q=Nova+Precil+Palmas+TO"
                target="_blank"
                rel="noreferrer"
              >
                <span className="contact-icon" aria-hidden="true">
                  <MapPin />
                </span>
                <span>
                  <strong>Endereço</strong>
                  <span>412 Norte, Al. 02, QI. 04, Lts. 18 a 22 — Palmas/TO</span>
                </span>
              </a>
            </div>

            <a className="button contact-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer">
              <MessageCircle /> Falar pelo WhatsApp
            </a>

            <div className="contact-social" aria-label="Redes sociais">
              <a href="https://www.instagram.com/novaprecil/" target="_blank" rel="noreferrer">
                <Instagram /> Instagram
              </a>
              <a href="https://www.facebook.com/novapreciloficial" target="_blank" rel="noreferrer">
                <Facebook /> Facebook
              </a>
            </div>
          </div>

          <div className="contact-map-wrap">
            <iframe
              className="contact-map"
              title="Localização da Nova Precil em Palmas"
              src="https://www.google.com/maps?q=Nova%20Precil%2C%20Palmas%20TO&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </Layout>
  )
}

function NotFound() {
  return (
    <Layout>
      <Seo title="Página não encontrada" description="A página solicitada não foi encontrada." path="/404" noIndex />
      <section className="not-found">
        <h1>Página não encontrada</h1>
        <p>O endereço informado não existe ou foi movido.</p>
        <Link className="button" to="/">
          Voltar ao início
        </Link>
      </section>
    </Layout>
  )
}

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      window.setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), 50)
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/produtos/" element={<ProductsArchive />} />
        <Route path="/produtos/page/2/" element={<ProductsArchive page={2} />} />
        <Route path="/produtos/:slug/" element={<ProductDetail />} />
        <Route path="/obras/" element={<WorksPage />} />
        <Route path="/politica-de-privacidade/" element={<PrivacyPolicyPage />} />
        <Route path="/contato/" element={<ContactPage />} />
        <Route path="/contatos/" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
