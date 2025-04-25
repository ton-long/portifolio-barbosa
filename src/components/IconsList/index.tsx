import { IconListProps } from "../../interfaces";

const IconList = ({ icons, classNames, onIconClick }: IconListProps) => (
  <ul className={classNames.list}>
    {icons.map(
      ({
        iconTitle,
        iconImg,
        iconLabel,
        shouldOpenWindow,
        iconContent,
        iconUrl,
        notMaximize,
      }) => (
        <button
          key={iconTitle}
          className={classNames.button}
          onClick={() =>
            onIconClick(
              iconTitle,
              iconImg,
              shouldOpenWindow,
              iconContent,
              iconUrl,
              notMaximize,
            )
          }
        >
          <li className={classNames.itenList}>
            <img src={iconImg} alt={iconLabel} className={classNames.image} />
            <span>{iconTitle}</span>
          </li>
        </button>
      )
    )}
  </ul>
);

export default IconList;
