import React from 'react';
import DragField from '../components/DragField';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import SwiperCat from '../components/SwiperCat';
function Posts({ categories }) {
  const { user, signOut } = useAuth();
  const [choosedCategory, setChoosedCategory] = React.useState(null);

  const handleChooseCategory = (category) => {
    setChoosedCategory(category);
    if (category.id === choosedCategory.id) {
      setChoosedCategory(null);
    }
  };

  return (
    <div className='p-20 '>
      <h1 className='text-3xl border-b-4 mb-10'>
        {choosedCategory
          ? 'Поиск по ' + choosedCategory.category_name
          : 'Все объявления'}
      </h1>
      <SwiperCat
        categories={categories}
        setChoosedCategory={handleChooseCategory}
      />
    </div>
  );
}

export default Posts;
