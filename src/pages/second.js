import { TextField } from "@mui/material";
import { X1, X2, X } from "../constant";
import { useDispatch, useSelector } from "react-redux";
import { addGoal, removeGoal } from "../reducer/goal";
import { addObstacle, removeObstacle } from "../reducer/obstacle";
import { addSecondTop, removeSecondTop } from "../reducer/secondTop";
import { addSecondBottom, removeSecondBottom } from "../reducer/secondBottom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./home.scss";
import Title from "../components/Title";
import Label from "../components/Label";
import { getSortDirection } from "../helper";
function getX(i) {
  if (i < 25) {
    return 1;
  } else {
    return parseInt((i - 25) / 5) + 2;
  }
}
function arrayRemove(arr, value) {
  return arr.filter(function (ele) {
    return ele !== value;
  });
}
const Second = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [textGoal, setTextGoal] = useState("");
  const [textObstacle, setTextObstacle] = useState("");
  const [drag, setDrag] = useState(false);
  const [dragBottom, setDragBottom] = useState(false);
  const [draggedItem, setDraggedItem] = useState({ row: -1, col: -1 });
  const [draggedItemBottom, setDraggedItemBottom] = useState({
    row: -1,
    col: -1,
  });
  const [components, setComponents] = useState([]);
  const [componentsBottom, setComponentsBottom] = useState([]);
  const [name, setName] = useState("");
  const [nameBottom, setNameBottom] = useState("");

  const Goals = useSelector((state) => state.Goal).value;
  const Obstacles = useSelector((state) => state.Obstacle).value;
  const [goals, setGoals] = useState(Goals);
  const [obstacles, setObstacles] = useState(Obstacles);
  const { age } = useSelector((state) => state.Person);
  const SecondTopvalue = useSelector((state) => state.SecondTop).value;
  const Secondbottomvalue = useSelector((state) => state.SecondBottom).value;

  function getUniqueListBy(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }

  useEffect(() => {
    const arr1 = getUniqueListBy(SecondTopvalue, "name");
    if (arr1.length != 0 && arr1.length != SecondTopvalue.length) {
      dispatch(removeSecondTop(arr1));
    }

    const namesArr = SecondTopvalue;
    const namesToDeleteArr = Goals;
    const namesToDeleteSet = new Set(namesToDeleteArr);
    const newArr = namesArr.filter((name) => {
      return !namesToDeleteSet.has(name.name.slice(0, name.name.length - 3));
    });
    if (SecondTopvalue.length !== newArr.length) {
      dispatch(removeSecondTop(newArr));
    }
  }, [SecondTopvalue, Goals]);

  useEffect(() => {
    const arr1 = getUniqueListBy(Secondbottomvalue, "nameBottom");
    if (arr1.length != 0 && arr1.length != Secondbottomvalue.length) {
      dispatch(removeSecondBottom(arr1));
    }

    const namesArr = Secondbottomvalue;
    const namesToDeleteArr = Obstacles;
    const namesToDeleteSet = new Set(namesToDeleteArr);
    const newArr = namesArr.filter((name) => {
      return !namesToDeleteSet.has(
        name.nameBottom.slice(0, name.nameBottom.length - 6)
      );
    });
    if (Secondbottomvalue.length !== newArr.length) {
      dispatch(removeSecondBottom(newArr));
    }
  }, [Secondbottomvalue, Obstacles]);

  useEffect(() => {
    if (getSortDirection(goals) == "unsorted") {
      let arr = [...goals];
      arr.sort();
      setGoals(arr);
    }
    if (getSortDirection(obstacles) == "unsorted") {
      let arr = [...obstacles];
      arr.sort();
      setObstacles(arr);
    }
  }, [goals, obstacles]);

  const temp = X.slice(getX(parseInt(age)), X.length);

  useEffect(() => {
    setGoals(Goals);
  }, [Goals]);

  useEffect(() => {
    setObstacles(Obstacles);
  }, [Obstacles]);

  const [currentName, setcurrentName] = useState(null);
  const [currentDraggedItem, setcurrentDraggedItem] = useState(null);
  const checkis = (e) => {
    e.preventDefault();
    if (currentName != null) {
      if (Goals.includes(currentName)) {
      } else {
        dispatch(addGoal(currentName));

        setComponents([
          ...components,
          (components[currentDraggedItem.row][currentDraggedItem.col] = []),
        ]);
      }
    }
  };

  const [bottomcurrentName, setbottomcurrentName] = useState(null);
  const [bottomcurrentDraggedItem, setbottomcurrentDraggedItem] =
    useState(null);
  const bottomcheckis = (e) => {
    e.preventDefault();
    if (bottomcurrentName != null) {
      if (Obstacles.includes(bottomcurrentName)) {
      } else {
        dispatch(addObstacle(bottomcurrentName));

        setComponentsBottom([
          ...componentsBottom,
          (componentsBottom[bottomcurrentDraggedItem.row][
            bottomcurrentDraggedItem.col
          ] = []),
        ]);
      }
    }
  };

  const handelMoveTop = (e, row, col) => {
    if (drag) {
      const temp = components.map((i) => i);
      if (!temp[row]) {
        temp[row] = [];
      }
      if (!temp[row][col]) {
        temp[row][col] = [];
      }
      if (temp[row][col].length === 0) {
        temp[row][col].push(
          <button
            className="mileButton"
            draggable="true"
            onDragStart={(e) => handleDragStart(e, row, col, name)}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            key={e}
          >
            {name}
          </button>
        );
        handleElement(name);
      } else {
        return;
      }
      if (draggedItem.row !== -1 && draggedItem.col !== -1) {
        temp[draggedItem.row][draggedItem.col].splice(0, 1);
      }
      dispatch(addSecondTop({ row, col, name: name + "top" }));
      setDraggedItem({ row: -1, col: -1 });
      setcurrentDraggedItem({ row: -1, col: -1 });
      setName("");
      setComponents(temp);
      setDrag(false);
    }
  };

  const changeGoal = (e) => {
    setTextGoal(e.target.value);
  };
  const changeObstacle = (e) => {
    setTextObstacle(e.target.value);
  };

  const handleDragStart = (event, row = -1, col = -1, name) => {
    setcurrentName(name);
    if (row !== -1 && col !== -1) {
      setDraggedItem({ row: row, col: col });
      setcurrentDraggedItem({ row: row, col: col });
    }
    event.target.style.opacity = 0.5;
    event.dataTransfer.effectAllowed = "move";
    setName(name);
    setDrag(true);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleDragEnd = (event) => {
    setTimeout(() => {
      setcurrentName(null);
    }, 200);
    event.target.style.opacity = 1;
    setTimeout(() => {
      setName("");
      setDraggedItem({ row: -1, col: -1 });
      setcurrentDraggedItem({ row: -1, col: -1 });
      setDrag(false);
    }, 500);
  };

  const handleMoveBottom = (e, row, col) => {
    if (dragBottom) {
      const temp = componentsBottom.map((i) => i);
      if (!temp[row]) {
        temp[row] = [];
      }
      if (!temp[row][col]) {
        temp[row][col] = [];
      }
      if (temp[row][col].length === 0) {
        temp[row][col].push(
          <button
            className="chalButton"
            draggable="true"
            onDragStart={(e) => handleDragStartBottom(e, row, col, nameBottom)}
            onDragOver={handleDragOverBottom}
            onDragEnd={handleDragEndBottom}
            key={e}
          >
            {nameBottom}
          </button>
        );
        handleElementBottom(nameBottom);
      } else {
        return;
      }
      if (draggedItemBottom.row !== -1 && draggedItemBottom.col !== -1) {
        temp[draggedItemBottom.row][draggedItemBottom.col].splice(0, 1);
      }
      dispatch(
        addSecondBottom({ row, col, nameBottom: nameBottom + "bottom" })
      );

      setbottomcurrentDraggedItem({ row: -1, col: -1 });
      setDraggedItemBottom({ row: -1, col: -1 });
      setNameBottom("");
      setComponentsBottom(temp);
      setDragBottom(false);
    }
  };
  const handleDragStartBottom = (event, row = -1, col = -1, name) => {
    setbottomcurrentName(name);
    if (row !== -1 && col !== -1) {
      setDraggedItemBottom({ row: row, col: col });
      setbottomcurrentDraggedItem({ row: row, col: col });
    }
    event.target.style.opacity = 0.5;
    event.dataTransfer.effectAllowed = "move";
    setNameBottom(name);
    setDragBottom(true);
  };

  const handleDragOverBottom = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleDragEndBottom = (event) => {
    setTimeout(() => {
      setbottomcurrentName(null);
    }, 200);
    event.target.style.opacity = 1;
    setTimeout(() => {
      setNameBottom("");
      setDraggedItemBottom({ row: -1, col: -1 });
      setbottomcurrentDraggedItem({ row: -1, col: -1 });
      setDragBottom(false);
    }, 500);
  };
  const handleElement = (element) => {
    dispatch(removeGoal(element));
    setGoals(arrayRemove(goals, element));
  };
  const handleElementBottom = (element) => {
    dispatch(removeObstacle(element));
    setObstacles(arrayRemove(obstacles, element));
  };

  return (
    <>
      <div className="second-screen">
        <div className="top title">
          <Title title={"The Next chapter"} />
          <div className="float-right p-5 w-[170px]">
            <TextField
              id="outlined-basic"
              label="Goal"
              variant="outlined"
              onChange={changeGoal}
              name="id"
            />
            <button
              className="addButton"
              onClick={() => {
                textGoal && dispatch(addGoal(textGoal));
              }}
            >
              Add
            </button>
          </div>
          <div
            onMouseOver={checkis}
            className="float-right button-wrap p-5 w-[450px]"
          >
            <Label label={"Quality of Life GOALS"} />

            {goals &&
              goals.map((element, index) => (
                <button
                  className="mileButton"
                  key={index}
                  draggable="true"
                  onDragStart={(e) => handleDragStart(e, -1, -1, element)}
                  onDragOver={handleDragOver}
                  onDragEnd={(e) => handleDragEnd(e)}
                >
                  {element}
                </button>
              ))}
          </div>
          <div className="w-full text-center">
            <table>
              <thead>
                <tr>
                  <td className="w-10"></td>
                  {temp.map((element) => (
                    <td key={element}>
                      {element === 1
                        ? "18-24years"
                        : element * 5 +
                          15 +
                          "-" +
                          parseInt(element * 5 + 19) +
                          "years"}
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {X1.map((element, index) => (
                  <tr key={index}>
                    <td className="table-title">{element}</td>
                    {temp.map((element) => (
                      <td
                        key={element}
                        onMouseOver={(e) => handelMoveTop(e, index, element)}
                      >
                        {components?.[index]?.[element]?.map((i) => i)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="chapter">
          <button className="next" onClick={() => navigate("/third")}>
            FUTURE CONFIDENCE
          </button>
        </div>
        <div className="bottom">
          <div className="w-full  mb-5 text-center">
            <table>
              <thead>
                <tr>
                  <td className="w-10"></td>
                  {temp.map((element) => (
                    <td key={element}>
                      {element === 1
                        ? "18-24years"
                        : element * 5 +
                          15 +
                          "-" +
                          parseInt(element * 5 + 19) +
                          "years"}
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {X2.map((element, index) => (
                  <tr key={index}>
                    <td className="table-title">{element}</td>
                    {temp.map((element) => (
                      <td
                        key={element}
                        onMouseOver={(e) => handleMoveBottom(e, index, element)}
                      >
                        {componentsBottom?.[index]?.[element]?.map((i) => i)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="float-right p-5 w-[170px]">
            <TextField
              id="outlined-basic"
              label="Obstacle"
              onChange={changeObstacle}
              name="id"
            />
            <button
              className="addButton"
              onClick={() => {
                textObstacle && dispatch(addObstacle(textObstacle));
              }}
            >
              Add
            </button>
          </div>
          <div
            onMouseOver={bottomcheckis}
            className="float-right button-wrap p-5  w-[450px]"
          >
            <Label label={"Quality of Life OBSTACLES"} />

            {obstacles &&
              obstacles.map((element, index) => (
                <button
                  key={index}
                  className="chalButton"
                  draggable="true"
                  onDragStart={(e) => handleDragStartBottom(e, -1, -1, element)}
                  onDragOver={handleDragOverBottom}
                  onDragEnd={(e) => handleDragEndBottom(e)}
                >
                  {element}
                </button>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Second;
