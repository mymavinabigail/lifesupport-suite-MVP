import { TextField } from "@mui/material";
import { X1, X2, X } from "../constant";
import { useDispatch, useSelector } from "react-redux";
import { addMilestone, removeMilestone } from "../reducer/milestone";
import { addChallenge, removeChallenge } from "../reducer/challenge";
import { addFirstTop, removeFirstTop } from "../reducer/firstTop";
import { addFirstBottom, removeFirstBottom } from "../reducer/firstBottom";
import { useEffect, useState } from "react";
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

const First = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [textMile, setTextMile] = useState("");
  const [textChal, setTextChal] = useState("");
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
  let Milestones = useSelector((state) => state.Milestone).value;
  let Chalstones = useSelector((state) => state.Challenge).value;
  const firstTopvalue = useSelector((state) => state.FirstTop).value;
  const firstbottomvalue = useSelector((state) => state.FirstBottom).value;

  function getUniqueListBy(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }

  useEffect(() => {
    const arr1 = getUniqueListBy(firstTopvalue, "name");
    if (arr1.length != 0 && arr1.length != firstTopvalue.length) {
      dispatch(removeFirstTop(arr1));
    }

    const namesArr = firstTopvalue;
    const namesToDeleteArr = Milestones;
    const namesToDeleteSet = new Set(namesToDeleteArr);
    const newArr = namesArr.filter((name) => {
      return !namesToDeleteSet.has(name.name);
    });
    if (firstTopvalue.length !== newArr.length) {
      dispatch(removeFirstTop(newArr));
    }
  }, [firstTopvalue, Milestones]);

  useEffect(() => {
    const arr1 = getUniqueListBy(firstbottomvalue, "nameBottom");
    if (arr1.length != 0 && arr1.length != firstbottomvalue.length) {
      dispatch(removeFirstBottom(arr1));
    }
    const namesArr = firstbottomvalue;
    const namesToDeleteArr = Chalstones;
    const namesToDeleteSet = new Set(namesToDeleteArr);
    const newArr = namesArr.filter((name) => {
      return !namesToDeleteSet.has(name.nameBottom);
    });
    if (firstbottomvalue.length !== newArr.length) {
      dispatch(removeFirstBottom(newArr));
    }
  }, [firstbottomvalue, Chalstones]);

  const [milestones, setMilestones] = useState(Milestones);
  const [chalstones, setChalstones] = useState(Chalstones);
  const { age } = useSelector((state) => state.Person);

  useEffect(() => {
    if (getSortDirection(milestones) == "unsorted") {
      let arr = [...milestones];
      arr.sort();
      setMilestones(arr);
    }
    if (getSortDirection(chalstones) == "unsorted") {
      let arr = [...chalstones];
      arr.sort();
      setChalstones(arr);
    }
  }, [milestones, chalstones]);

  const temp = X.slice(0, getX(parseInt(age)));

  const [currentName, setcurrentName] = useState(null);
  const [currentDraggedItem, setcurrentDraggedItem] = useState(null);
  const checkis = (e) => {
    e.preventDefault();
    if (currentName != null) {
      if (milestones.includes(currentName)) {
      } else {
        dispatch(addMilestone(currentName));

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
      if (chalstones.includes(bottomcurrentName)) {
      } else {
        dispatch(addChallenge(bottomcurrentName));

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
      const newComponents = components.map((i) => i);
      if (!newComponents[row]) {
        newComponents[row] = [];
      }
      if (!newComponents[row][col]) {
        newComponents[row][col] = [];
      }

      if (newComponents[row][col].length === 0) {
        newComponents[row][col].push(
          <button
            className="mileButton"
            draggable="true"
            onDragStart={(e) => handleDragStart(e, row, col, name)}
            onDragOver={handleDragOver}
            onDragEnd={(e) => handleDragEnd(e, row, col)}
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
        newComponents[draggedItem.row][draggedItem.col].splice(0, 1);
      }
      dispatch(addFirstTop({ row, col, name }));
      setDraggedItem({ row: -1, col: -1 });
      setcurrentDraggedItem({ row: -1, col: -1 });
      setName("");
      setComponents(newComponents);
      setDrag(false);
    }
  };
  useEffect(() => {
    setMilestones(Milestones);
  }, [Milestones]);

  useEffect(() => {
    setChalstones(Chalstones);
  }, [Chalstones]);

  const changeMile = (e) => {
    setTextMile(e.target.value);
  };
  const changeChal = (e) => {
    setTextChal(e.target.value);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleDragOverBottom = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleMoveBottom = (e, row, col) => {
    if (dragBottom) {
      const newComponents = componentsBottom.map((i) => i);
      if (!newComponents[row]) {
        newComponents[row] = [];
      }
      if (!newComponents[row][col]) {
        newComponents[row][col] = [];
      }
      if (newComponents[row][col].length === 0) {
        newComponents[row][col].push(
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
        handleElementBotton(nameBottom);
      } else {
        return;
      }

      if (draggedItemBottom.row !== -1 && draggedItemBottom.col !== -1) {
        newComponents[draggedItemBottom.row][draggedItemBottom.col].splice(
          0,
          1
        );
      }
      setDraggedItemBottom({ row: -1, col: -1 });
      dispatch(addFirstBottom({ row, col, nameBottom }));
      setbottomcurrentDraggedItem({ row: -1, col: -1 });
      setNameBottom("");
      setComponentsBottom(newComponents);
      setDragBottom(false);
    }
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

  const handleDragEnd = (event, row, col) => {
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
    dispatch(removeMilestone(element));
    setMilestones(arrayRemove(milestones, element));
  };
  const handleElementBotton = (element) => {
    dispatch(removeChallenge(element));
    setChalstones(arrayRemove(chalstones, element));
  };

  return (
    <>
      <div className="first-screen">
        <div className="top title">
          <Title title={"My Story so far"} />

          <div className="float-right p-5 w-[170px]">
            <TextField
              id="outlined-basic"
              label="Milestone"
              variant="outlined"
              onChange={changeMile}
              name="id"
            />
            <button
              className="addButton"
              onClick={() => {
                textMile && dispatch(addMilestone(textMile));
              }}
            >
              Add
            </button>
          </div>
          <div
            onMouseOver={checkis}
            className="float-right button-wrap p-5 w-[450px]"
          >
            <Label label={"Quality of Life MILESTONES"} />

            {milestones.map((element, index) => (
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
          <div className="w-full  text-center">
            <table>
              <thead>
                <tr>
                  <td className=" text-center"></td>
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
          <button
            className="next"
            onClick={() => {
              navigate("/second");
            }}
          >
            THE NEXT CHAPTER
          </button>
        </div>
        <div className="bottom">
          <div className="w-full text-center">
            <table>
              <thead>
                <tr>
                  <td className=""></td>
                  {temp.map((element) => (
                    <td key={element}>
                      {element === 1
                        ? " 18-24years"
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
              label="Challenge"
              variant="outlined"
              onChange={changeChal}
              name="id"
            />
            <button
              className="addButton"
              onClick={() => {
                textChal && dispatch(addChallenge(textChal));
              }}
            >
              Add
            </button>
          </div>
          <div
            onMouseOver={bottomcheckis}
            className="float-right button-wrap p-5 w-[450px]"
          >
            <Label label={"Quality of Life CHALLENGES"} />

            {chalstones &&
              chalstones.map((element, index) => (
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

export default First;
