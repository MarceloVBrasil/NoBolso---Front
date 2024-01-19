export default function Botao({ texto, classname, onClick, dataTestId }: { texto: string, classname: string, onClick: () => void, dataTestId?: string }) {
    return (
        <button data-testid={dataTestId} className={classname} onClick={onClick}>{texto}</button>
    )
}
