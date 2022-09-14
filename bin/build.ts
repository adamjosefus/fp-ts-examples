import { join, dirname } from "./libs/path.ts";


function normalizePath(path: string): string {
    return path.startsWith('./') ? path.replace('./', '') : path
}


async function updateContent(content: string, root: string): Promise<string> {
    const regex = /\{\{(?<path>\S+?)\}\}/g
    
    async function createMap(content: string, root: string) {
        const paths: string[] = [];

        regex.lastIndex = 0
        let result: RegExpExecArray | null = null;

        do {
            result = regex.exec(content)

            const { path } = result?.groups ?? {}
            if (path) paths.push(path);
        } while (result)

        const promises = paths
            .map(path => path.trim())
            .map(path => normalizePath(path))
            .filter((v, i, arr) => arr.indexOf(v) === i)
            .map(path => (async () => {
                const file = join(root, path)
                // const raw = await Deno.readTextFile(file)
                const content = await loadFile(file)

                return [path, content] as [string, string]
            })())
        
        const entries = await Promise.all(promises)

        return new Map(entries)
    }

    const dictionary = await createMap(content, root)

    regex.lastIndex = 0;
    return content.replace(regex, (_match, _p1, _offset, _string, groups) => {
        const path = normalizePath(groups.path);

        if (!dictionary.has(path)) return '🛑'

        return dictionary.get(path)!
    })
}


async function loadFile(file: string): Promise<string> {
    const root = dirname(file)
    const content = await Deno.readTextFile(file)

    return await updateContent(content, root)
}


async function build(path: string, srcDir: string, distDir: string) {
    const srcPath = join(srcDir, path)
    const distPath = join(distDir, path)

    const result = await loadFile(srcPath)

    await Deno.writeTextFile(distPath, result, {
    })
}


await build('Either.md', './src', './')