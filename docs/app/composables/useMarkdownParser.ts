import {
  createMarkdownParser,
  rehypeHighlight,
  createShikiHighlighter,
} from '@nuxtjs/mdc/runtime'
import MaterialThemePalenight from '@shikijs/themes/material-theme-palenight'
import MaterialThemeLighter from '@shikijs/themes/material-theme-lighter'
import HtmlLang from '@shikijs/langs/html'
import MdcLang from '@shikijs/langs/mdc'
import TsLang from '@shikijs/langs/typescript'
import VueLang from '@shikijs/langs/vue'
import ScssLang from '@shikijs/langs/scss'
import YamlLang from '@shikijs/langs/yaml'
import JsLang from '@shikijs/langs/javascript'
import JsonLang from '@shikijs/langs/json'
import BashLang from '@shikijs/langs/bash'

let parserInstance: Awaited<ReturnType<typeof createMarkdownParser>> | null = null
let parserPromise: Promise<Awaited<ReturnType<typeof createMarkdownParser>>> | null = null

async function getParser() {
  if (parserInstance) {
    return parserInstance
  }

  if (!parserPromise) {
    parserPromise = createMarkdownParser({
      rehype: {
        plugins: {
          highlight: {
            instance: rehypeHighlight,
            options: {
              theme: {
                default: 'material-theme-palenight',
                light: 'material-theme-lighter',
                dark: 'material-theme-palenight',
              },
              highlighter: createShikiHighlighter({
                bundledThemes: {
                  'material-theme-palenight': MaterialThemePalenight,
                  'material-theme-lighter': MaterialThemeLighter,
                },
                bundledLangs: {
                  html: HtmlLang,
                  mdc: MdcLang,
                  vue: VueLang,
                  yml: YamlLang,
                  yaml: YamlLang,
                  scss: ScssLang,
                  ts: TsLang,
                  typescript: TsLang,
                  js: JsLang,
                  javascript: JsLang,
                  json: JsonLang,
                  bash: BashLang,
                  sh: BashLang,
                },
              }),
            },
          },
        },
      },
    })
  }

  parserInstance = await parserPromise
  return parserInstance
}

export default function useMarkdownParser() {
  return async (markdown: string) => {
    const parser = await getParser()
    return parser(markdown)
  }
}
