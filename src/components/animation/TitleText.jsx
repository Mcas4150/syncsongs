import styled from "@emotion/styled";

const TitleText = ({ text }) => {
  return (
    <Title>
      {text.split("").map(function (char, index) {
        let randomColor = Math.random().toString(16).substr(-6);
        let style = {
          color: `#${randomColor}`,
        };
        return (
          <span aria-hidden="true" key={index} style={style}>
            {char}
          </span>
        );
      })}
    </Title>
  );
};

export default TitleText;

const Title = styled.div`
  font-size: 150px;
  font-family: bubbleFont;
`;
