import { Hero } from '../components/Hero.jsx'
import { IntroLineas } from '../components/IntroLineas.jsx'
import { Secretarias } from '../components/Secretarias.jsx'
import { Noticias } from '../components/Noticias.jsx'
import { Enlaces } from '../components/Enlaces.jsx'
import { Gaceta } from '../components/Gaceta.jsx'
import { useReveal } from '../hooks/useReveal.js'

export function Home() {
  useReveal()

  return (
    <>
      <Hero />
      <IntroLineas />
      <Secretarias />
      <Noticias limit={8} showMore />
      <Gaceta />
      <Enlaces />
    </>
  )
}
