import { createHighlighter } from 'shiki'
import MaterialThemePalenight from '@shikijs/themes/material-theme-palenight'
import MaterialThemeLighter from '@shikijs/themes/material-theme-lighter'
import VueLang from '@shikijs/langs/vue'

type Highlighter = Awaited<ReturnType<typeof createHighlighter>>

// Module-level singleton: created once and reused across all component instances
let _promise: Promise<Highlighter> | null = null

function getHighlighter(): Promise<Highlighter> {
    return (_promise ??= createHighlighter({
        themes: [MaterialThemePalenight, MaterialThemeLighter],
        langs: [VueLang],
    }))
}

export default function useShikiHighlighter() {
    const highlight = async (code: string): Promise<string> => {
        if (!code) return ''
        const hl = await getHighlighter()
        return hl.codeToHtml(code, {
            lang: 'vue',
            themes: {
                light: 'material-theme-lighter',
                dark: 'material-theme-palenight',
            },
            transformers: [
                {
                    code(node) {
                        // Remove \n text nodes between .line spans — inside <pre white-space:pre>
                        // those newlines render as visible blank lines even with font-size:0.
                        node.children = node.children.filter(
                            (child) => !(child.type === 'text' && child.value === '\n'),
                        )
                    },
                },
            ],
        })
    }

    return { highlight }
}
