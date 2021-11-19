export function formatThousands(number: any, prefix: string = '', locale: string = 'id-ID') {
    let nf = new Intl.NumberFormat(locale);
    return prefix + (nf.format(number));
}