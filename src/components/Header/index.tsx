import logoImg from '../../assets/logo.svg'
import addImg from '../../assets/add.png'
import { Container, Content } from './styles'

interface HeaderProps {
    onOpenNewTransactionModal: () => void;
}

export function Header({onOpenNewTransactionModal}: HeaderProps) {
    return (
        <Container>
            <Content>
                <img src={logoImg} alt="dt money" />
                <button type="button" onClick={onOpenNewTransactionModal}>
                    <img className="addImg" src={addImg} alt="Adicionar" />
                </button>
            </Content>
        </Container>
    )
}