import "./App.css";
import { useState } from "react";
import { Post } from "./post";
import { Methods } from "./methodPanel";
import { useCustomQuery } from "./query";

function App() {
  const [url, setUrl] = useState<string>("");
  const [method, setMethod] = useState<string>("GET");
  const [postBody, setPostBody] = useState<{ [key: string]: string }>({});
  const [grid, setGrid] = useState<number[][]>([[0, 1]]);
  const [getQuery, postQuery, patchQuery, deleteQuery] = useCustomQuery(url);

  const fetch: () => Promise<void> = async function () {
    getQuery.status == "idle";
    postQuery.status == "idle";
    patchQuery.status == "idle";
    deleteQuery.status == "idle";
    switch (method) {
      case "GET":
        await getQuery.refetch();
        break;
      case "POST":
        postQuery.mutate(postBody);
        break;
      case "PUT/PATCH":
        patchQuery.mutate(postBody);
        break;
      case "DELETE":
        await deleteQuery.mutate();
        break;
    }
    return;
  };

  return (
    <div className="app">
      <h2>REpresentationalStateTransfer API Client</h2>
      <div className="input">
        <input id="url" type="text" onChange={(e) => setUrl(e.target.value)} />
        <button onClick={fetch}>{method}</button>
      </div>

      <Methods setMethod={setMethod} method={method} />

      <div className="query-state">
        <p>Fetch Status: {getQuery.fetchStatus.toUpperCase()}</p>
        <p>Response Status: {getQuery.status.toUpperCase()}</p>
      </div>

      {method == "POST" || method == "PUT/PATCH" ? (
        <Post
          grid={grid}
          setGrid={setGrid}
          postBody={postBody}
          setPostBody={setPostBody}
        />
      ) : null}

      {getQuery.status == "success" ? (
        <div className="container">
          <div className="display">
            <pre>{JSON.stringify(getQuery.data.data, null, 2)}</pre>
          </div>
        </div>
      ) : getQuery.status == "error" ? (
        <div className="container">
          <div className="display">
            <p>Error Message: {getQuery.error?.message}</p>
          </div>
        </div>
      ) : null}

      {postQuery.status == "success" ? <h3>posted!</h3> : null}

      {patchQuery.status == "success" ? (
        <div className="container">
          <div className="display">
            <pre>{JSON.stringify(patchQuery.data.data, null, 2)}</pre>
          </div>
        </div>
      ) : null}

      {deleteQuery.status == "success" ? (
        <div className="container">
          <div className="display">
            <pre>{JSON.stringify(deleteQuery.data.data, null, 2)}</pre>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
