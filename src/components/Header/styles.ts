import styled from 'styled-components';

export const Container = styled.header`
    background: #000;
`;

export const Content = styled.div`
    max-width: 1120px;
    margin: 0 auto;

    .addImg {
            width: 25px;
            height: 25px;
        }

    //1rem = 16px (definido no root)
    padding: 2rem 1rem 12rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
        font-size: 1rem;
        color: #FFF;
        background: var(--green);
        border: 0;
        padding: 0 1rem;
        padding-top: 0.4rem;
        border-radius: 0.25rem;
        height: 3rem;

        transition: filter 0.2s;

        &:hover {
            filter: brightness(0.9);
        }
    }
`;