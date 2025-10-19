import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const animateElement = (element: Element | null | undefined, fromVars: any, toVars: any) => {
  if (element) {
    gsap.fromTo(element, fromVars, toVars)
  }
}

export const animateElements = (elements: NodeListOf<Element> | null | undefined, fromVars: any, toVars: any) => {
  if (elements) {
    gsap.fromTo(elements, fromVars, toVars)
  }
}

export const createScrollTrigger = (trigger: HTMLElement | null | undefined, onEnter: () => void, start: string = 'top 80%') => {
  if (trigger) {
    ScrollTrigger.create({
      trigger,
      start,
      onEnter,
    })
  }
}

export const safeGsapAnimation = (callback: () => void) => {
  if (typeof window !== 'undefined') {
    callback()
  }
}