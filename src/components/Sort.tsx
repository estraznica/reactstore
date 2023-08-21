import React from 'react';
import styles from '../scss/components/sort.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveIndexSort } from '../redux/slices/filterSlice';

function Sort() {
  const [isVisible, setVisible] = React.useState(false);
  const sortby = ['recommended', 'more popular', 'less popular'];

  const dispatch = useDispatch();
  const activeIndexSort = useSelector((state: any) => state.filterReducer.activeIndexSort);
  const onChangeSort = (index: any) => {
    dispatch(setActiveIndexSort(index));
  };

  const sortRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (!event.composedPath().includes(sortRef.current as EventTarget)) {
        setVisible(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []); //скрываю popup окно при клике вне его

  return (
    <>
      <div className="sort" ref={sortRef}>
        <div onClick={() => setVisible(!isVisible)} className={styles.root}>
          Sort by: <span className={styles.active}>{sortby[activeIndexSort]}</span>
          {isVisible && (
            <ul className={styles.popup}>
              {sortby.map((value, index) => (
                <li key={index} onClick={() => onChangeSort(index)}>
                  {value}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default Sort;
