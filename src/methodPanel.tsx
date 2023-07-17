type methodType = {
  method: string;
  setMethod: (method: string) => void;
};

export const Methods = ({ setMethod, method }: methodType) => {
  const methodSelector = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    switch (target.innerText) {
      case "GET":
        setMethod("GET");
        break;
      case "POST":
        setMethod("POST");
        break;
      case "PUT/PATCH":
        setMethod("PUT/PATCH");
        break;
      case "DELETE":
        setMethod("DELETE");
    }
  };
  return (
    <ul>
      <li
        style={{
          backgroundColor: method == "GET" ? "lightgreen" : "white",
        }}
        onClick={methodSelector}
      >
        GET
      </li>
      <li
        style={{
          backgroundColor: method == "POST" ? "lightgreen" : "white",
        }}
        onClick={methodSelector}
      >
        POST
      </li>
      <li
        style={{
          backgroundColor: method == "PUT/PATCH" ? "lightgreen" : "white",
        }}
        onClick={methodSelector}
      >
        PUT/PATCH
      </li>
      <li
        style={{
          backgroundColor: method == "DELETE" ? "lightgreen" : "white",
        }}
        onClick={methodSelector}
      >
        DELETE
      </li>
    </ul>
  );
};
