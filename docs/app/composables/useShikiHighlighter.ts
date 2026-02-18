import { createHighlighterCore } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import type { HighlighterCore } from 'shiki/core'
import * as prettier from 'prettier'
import prettierHtml from 'prettier/plugins/html'

let _promise: Promise<HighlighterCore> | null = null

function getHighlighter(): Promise<HighlighterCore> {
    return (_promise ??= createHighlighterCore({
        engine: createJavaScriptRegexEngine(),
        themes: [
            import('@shikijs/themes/material-theme-darker'),
            import('@shikijs/themes/material-theme-lighter'),
        ],
        langs: [
            import('@shikijs/langs/vue'),
        ],
    }))
}

export default function useShikiHighlighter() {
    const highlight = async (code: string): Promise<string> => {
        if (!code) return ''
        const formatted = await prettier.format(code, {
            parser: 'vue',
            plugins: [prettierHtml],
            printWidth: 80,
            tabWidth: 4,
            singleQuote: true,
            htmlWhitespaceSensitivity: 'ignore',
        }).catch(() => code)
        const hl = await getHighlighter()
        return hl.codeToHtml(formatted, {
            lang: 'vue',
            themes: {
                light: 'material-theme-lighter',
                dark: 'material-theme-darker',
            },
            transformers: [
                {
                    pre(node) {
                        node.properties.style = `${node.properties.style ?? ''};margin:0;padding:1rem 1.25rem;white-space:pre-wrap;overflow-wrap:break-word`
                    },
                    code(node) {
                        node.children = node.children.filter(
                            (child) => !(child.type === 'text' && child.value === '\n'),
                        )
                        // Remove trailing empty line spans (artifact of Prettier's trailing newline)
                        while (node.children.length > 0) {
                            const last = node.children[node.children.length - 1] as any
                            if (last.type === 'element' && last.children?.length === 0) {
                                node.children.pop()
                            } else break
                        }
                    },
                },
            ],
        })
    }

    return { highlight }
}
