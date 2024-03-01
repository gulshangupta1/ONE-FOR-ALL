export namespace XpathUtil {
    export function getPlaceholderReplaced(xpath: string, replacement: string): string {
        return xpath.replace(/##PLACEHOLDER##/g, replacement);
    }
}