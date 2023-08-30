import styled from 'styled-components';

interface SCWrapperProps {
  maxSize?: number;
  horizontalPadding?: number;
}

const SCWrapper = styled.div<SCWrapperProps>`
  max-width: ${(props) => (props?.maxSize ? `${props.maxSize}px` : '1700px')};
  margin: 0 auto;
  padding: ${(props) =>
    props?.horizontalPadding ? `0 ${props?.horizontalPadding}px` : 0};
`;

export default SCWrapper;
