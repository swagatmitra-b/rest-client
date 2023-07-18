import { useEffect, useRef, useCallback } from "react";

type face = {
  grid: number[][];
  postBody: {[key:string]: string};
  setGrid: (newgrid: number[][]) => void;
  setPostBody: (postBody: object) => void;
};

export const Post = ({ grid, setGrid, postBody, setPostBody }: face) => {
  const key = useRef<HTMLInputElement>(null);
  const parseBody = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { placeholder, value } = e.target;
    placeholder === "key"
      ? setPostBody({ ...postBody, [value]: "" })
      : setPostBody(() => {
          const keyVal = key.current?.value;
          return { ...postBody, [keyVal!]: value };
        });
  };

  const cleanup = useCallback(() => {
    for (const value in postBody) {
      if (postBody[value] === "") {
        delete postBody[value];
      }
    }
    setPostBody(postBody);
  }, [postBody, setPostBody]);

  const deletion = () => {
    grid.pop();
    setGrid(grid);
    const keyArr = Object.keys(postBody);
    const lastKey = keyArr[keyArr.length - 1];
    delete postBody[lastKey];
    setPostBody(postBody);
  };

  useEffect(() => {
    cleanup();
    console.log(postBody)
  }, [postBody, cleanup])

  return (
    <div className="json-tree">
       <h4>JSON TREE</h4>
      <div className="tree-button">
        <button
          style={grid.length == 0 ? { marginTop: "0.6rem" } : {}}
          onClick={() => {
            setGrid([...grid, [1, 1]]);
          }}
        >
          Add pair
        </button>
        {grid.length != 0 ? (
          <button onClick={deletion}>Delete pair</button>
        ) : null}
      </div>
      <div className="tree">
        {grid.map((row) =>
          row.map((_, i) => (
            <input
              key={i}
              type="text"
              placeholder={i == 0 ? "key" : "value"}
              onChange={parseBody}
              ref={i == 0 ? key : null}
            />
          ))
        )}
      </div>
    </div>
  );
};
