import React from 'react';
// import { useForm } from 'react-hook-form';
// interface IProduct {
//   name?: string;
//   price?: string;
//   storage?: string;
// }

// interface ICatalog {
//   name?: string;
//   _id: string;
// }

// interface IPriceList {
//   phoneCatalog: ICatalog[];
//   phoneProducts: Record<string, IProduct[]>;
// }

// const defaultValues: IPriceList = {
//   phoneCatalog: [
//     { name: 'iPhone', _id: 'cat_phone_1' },
//     { name: 'Samsung', _id: 'cat_phone_2' }
//   ],
//   phoneProducts: {
//     cat_phone_1: [
//       { name: 'iPhone 13', price: '799', storage: '128GB' },
//       { name: 'iPhone 14', price: '999', storage: '256GB' }
//     ],
//     cat_phone_2: [
//       { name: 'Samsung Galaxy S22', price: '850', storage: '128GB' }
//     ]
//   }
// };
// console.log(defaultValues);

const ModalCreatePriceListPageAdmin: React.FC = () => {
  // const { handleSubmit, register } = useForm({ defaultValues });

  // const onSubmit = (data: any) => {
  //   console.log('Form Data:', data);
  // };

  return (
    <div>
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Phone Catalog</h2>
        {defaultValues.phoneCatalog.map((_, index) => (
          <div key={index}>
            <label>Name:</label>
            <input {...register(`phoneCatalog.${index}.name`)} />
            <label>ID:</label>
            <input {...register(`phoneCatalog.${index}._id`)} />
          </div>
        ))}

        <h2>Phone Products</h2>
        {Object.entries(defaultValues.phoneProducts).map(
          ([categoryId, products], index) => (
            <div key={index}>
              <h3>Category ID: {categoryId}</h3>
              {products.map((_, pIndex) => (
                <div key={pIndex}>
                  <label>Name:</label>
                  <input
                    {...register(`phoneProducts.${categoryId}.${pIndex}.name`)}
                  />
                  <label>Price:</label>
                  <input
                    {...register(`phoneProducts.${categoryId}.${pIndex}.price`)}
                  />
                  <label>Storage:</label>
                  <input
                    {...register(
                      `phoneProducts.${categoryId}.${pIndex}.storage`
                    )}
                  />
                </div>
              ))}
            </div>
          )
        )}

        <button type="submit">Submit</button>
      </form> */}
    </div>
  );
};

export default ModalCreatePriceListPageAdmin;
