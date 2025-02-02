import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import DSIPContext from "../../../Contexts/DashboardSidebarIsOpenContext";
import PositionContext from "../../../Contexts/PositionContext";

export default function Navigations({ navitems }) {
  const items = navitems;
  const { setPosition } = useContext(PositionContext);
  const { isOpen, setMdIsOpen } = useContext(DSIPContext);

  const handleClickOnItem = (item) => {
    setPosition(item.name);
    setMdIsOpen(false);
  };

  return (
    <div id="nav_area" className="">
      <ul className="flex flex-col gap-1">
        {items.map((item, index) => (
          <li
            className={`pl-2 border-b border-secondary dark:border-dark_secondary py-2 last:border-b-0 ${
              !isOpen && "md:py-2"
            }`}
            key={index}
          >
            <button
              className="flex items-center justify-start gap-2"
              onClick={() => handleClickOnItem(item)}
            >
              <FontAwesomeIcon icon={`fa-solid ${item.icon}`} />
              <span
                className={`transition-all duration-500 ${
                  !isOpen && "md:opacity-0"
                }`}
              >
                {" "}
                {item.name}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
