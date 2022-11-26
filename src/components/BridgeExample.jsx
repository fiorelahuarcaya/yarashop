import React from "react";

// Configuración del cómo se ve el botón
const ButtonUI = ({ theme, ...props }) => {
  return (
    <button
      {...props}
      style={{
        padding: "16px",
        backgroundColor: theme.backgroundColor,
        color: theme.color,
        fontWeight: "600",
      }}
    />
  );
};

// Funcionalidad del botón
const Link = ({ url, uiComponent, uiProps, children }) => {
  const bridgeProps = {
    ...uiProps,
    onClick: () => {window.open(url, "_self")
  }
  };

  return React.createElement(uiComponent, bridgeProps, children);
};

// Usuario Cliente que accede a dicho recurso
const Client = (props) => {
  const theme = { backgroundColor: props.backgroundColor, color: props.color };
  return (
    <Link
      url= {props.url}
      uiComponent={ButtonUI}
      uiProps={{ theme }}
    >
      {props.text}
    </Link>
  );
};

export default Client;