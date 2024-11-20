import { PrismaClient } from "@prisma/client";
import { hash } from 'bcrypt'

//https://chatgpt.com/c/b05f382c-8f81-49bd-90d0-9cc4b0593261
const prisma = new PrismaClient()


async function main() {

    const password = await hash('test', 12)

    const user = await prisma.user.upsert({
        where: { email: 'test@test.com' },
        update: {},
        create: {
            email: 'test@test.com',
            name: 'Test User',
            password
          }
    })

    const account = await prisma.account.create({
        data: { userId: user.id,
         type: 'credentials',
         provider: 'credentials',
         providerAccountId: user.id
    }})

    // Second user (sanjay@gmail.com)
  const user2 = await prisma.user.create({
    data: {
      email: 'sanjay@gmail.com',
      name: 'Sanjay Karki',
      phone: '9876543210',  
      password: password,
      dob: new Date('1995-01-01'), 
    //   gender: 'Male',  // Example gender
    
    },
  });

  const account2 = await prisma.account.create({
    data: {
      userId: user2.id,
      type: 'credentials',
      provider: 'credentials',
      providerAccountId: user2.id,
    },
  });

    // Create Categories
    const categories = await prisma.category.createMany({
        data: [
          { categoryName: 'Electronics', description: 'Devices and gadgets' },
          { categoryName: 'Clothing', description: 'Apparel and accessories' },
          { categoryName: 'Books', description: 'Books and literature' },
          { categoryName: 'Furniture', description: 'Home and office furniture' },
          { categoryName: 'Groceries', description: 'Food and household items' },
        ],
      });

      // Create Suppliers
 await prisma.supplier.createMany({
  data: [
    { supplierName: 'TechSource Inc', email: 'info@techsource.com', phone: '123-456-7890', address: '123 Tech Ave, New York' },
    { supplierName: 'Apparel World', email: 'support@apparelworld.com', phone: '987-654-3210', address: '456 Fashion St, Los Angeles' },
    { supplierName: 'Book Haven', email: 'contact@bookhaven.com', phone: '654-789-3210', address: '789 Literature Ln, Chicago' },
    { supplierName: 'OfficeFurniturePro', email: 'sales@officefurniturepro.com', phone: '321-987-6543', address: '101 Office Blvd, San Francisco' },
    { supplierName: 'GourmetGrocers', email: 'info@gourmetgrocers.com', phone: '111-222-3333', address: '123 Food St, Houston' },
  ],
});
// Fetch suppliers
// const suppliersList = await prisma.supplier.findMany({
//   where: {
//     supplierName: {
//       in: [
//         'TechSource Inc',
//         'Apparel World',
//         'Book Haven',
//         'OfficeFurniturePro',
//         'GourmetGrocers'
//       ]
//     }
//   }
// });

// Create products with supplier relationships
const products = await prisma.product.createMany({
  data: [
    {
      name: 'Smartphone',
      description: 'Latest smartphone with cutting-edge features',
      costPrice: 500,
      quantityInStock: 100,
      salePrice: 600,
      margin: '20%',
      image: "https://img.freepik.com/free-vector/realistic-display-smartphone-with-different-apps_52683-30241.jpg",
      categoryId: (await prisma.category.findFirst({ where: { categoryName: 'Electronics' } }))?.id!,
      // suppliers: {
      //   connect: { id: (await prisma.supplier.findFirst({ where: { supplierName: 'TechSource Inc' } }))?.id }
      // }
    
    },
    {
      name: 'T-shirt',
      description: 'Cotton t-shirt in various sizes',
      costPrice: 10,
      quantityInStock: 200,
      salePrice: 15,
      margin: '50%',
      image: "https://veirdo.in/cdn/shop/files/FROGOGNL.jpg",
      categoryId: (await prisma.category.findFirst({ where: { categoryName: 'Clothing' } }))?.id!,
      // suppliers: {
      //   connect: { id: (await prisma.supplier.findFirst({ where: { supplierName: 'Apparel World' } }))?.id }
      // }
    },
    {
      name: 'Office Chair',
      description: 'Ergonomic office chair',
      costPrice: 100,
      quantityInStock: 50,
      salePrice: 150,
      margin: '33%',
      image: "https://sbfurniturenepal.com/web/image/product.product/4532/image_1024/%5B19087811%5D%20Landy%20Office%20Chair%20-%20Black?unique=5becb20",
      categoryId: (await prisma.category.findFirst({ where: { categoryName: 'Furniture' } }))?.id!,
      // suppliers: {
      //   connect: { id: (await prisma.supplier.findFirst({ where: { supplierName: 'Apparel World' } }))?.id }
      // }
    },
    {
      name: 'Fiction Novel',
      description: 'Best-selling fiction novel',
      costPrice: 5,
      quantityInStock: 300,
      salePrice: 10,
      margin: '50%',
      image: "https://static01.nyt.com/images/2020/12/03/books/00HISTORICAL-TOP-TEN-COMBO/00HISTORICAL-TOP-TEN-COMBO-jumbo-v2.jpg?quality=75&auto=webp",
      categoryId: (await prisma.category.findFirst({ where: { categoryName: 'Books' } }))?.id!,
      // suppliers: {
      //   connect: { id: (await prisma.supplier.findFirst({ where: { supplierName: 'Apparel World' } }))?.id }
      // }
    },
    {
      name: 'Pasta',
      description: 'Italian pasta, 500g pack',
      costPrice: 2,
      quantityInStock: 400,
      salePrice: 3,
      margin: '33%',
      image: "https://cdn77-s3.lazycatkitchen.com/wp-content/uploads/2021/10/roasted-tomato-sauce-portion-800x1200.jpg",
      categoryId: (await prisma.category.findFirst({ where: { categoryName: 'Groceries' } }))?.id!,
  
      
    },
  ],
});



   // Create Variants
   const productsList = await prisma.product.findMany();
   const colorVariant = await prisma.variant.create({
    data: {
      name: 'Color',

    },
  });

  const sizeVariant = await prisma.variant.create({
    data: {
      name: 'Size',
     
    },
  });


  const varientOptions = await prisma.variantOption.createMany({
    data: [
   
      { value: 'R',  var_id: colorVariant.id },
      { value: 'G', var_id: colorVariant.id },
      { value: 'B',  var_id: colorVariant.id },
    
      { value: 'sm', var_id: sizeVariant.id },
      { value: 'md', var_id: sizeVariant.id },
      { value: 'lg',  var_id: sizeVariant.id },
    ],
  });

 // Create Variants for each product
await prisma.productVariant.createMany({
  data: [
    // Variants for Smartphone
    {
      var_id: colorVariant.id,
      
      var_opt: (await prisma.variantOption.findFirst({ where: { var_id: colorVariant.id, value: 'R' } }))?.id,
      productId: productsList[0].id, // Smartphone
      var_img: "https://example.com/smartphone_red.jpg",
      stock: 20,
      salePrice: 700,
      discount: 5,
    },
    {
      var_id: colorVariant.id,
      var_opt: (await prisma.variantOption.findFirst({ where: { var_id: colorVariant.id, value: 'B' } }))?.id,
      productId: productsList[0].id, // Smartphone
      var_img: "https://example.com/smartphone_blue.jpg",
      stock: 20,
      salePrice: 700,
      discount: 5,
    },

    // Variants for T-shirt
    {
      var_id: colorVariant.id,
      var_opt: (await prisma.variantOption.findFirst({ where: { var_id: colorVariant.id, value: 'R' } }))?.id,
      productId: productsList[1].id, // T-shirt
      var_img: "https://example.com/tshirt_red.jpg",
      stock: 100,
      salePrice: 15,
      discount: 10,
    },
    {
      var_id: sizeVariant.id,
      var_opt: (await prisma.variantOption.findFirst({ where: { var_id: sizeVariant.id, value: 'md' } }))?.id,
      productId: productsList[1].id, // T-shirt
      var_img: "https://example.com/tshirt_medium.jpg",
      stock: 100,
      salePrice: 15,
      discount: 10,
    },

    // Variants for Office Chair
    {
      var_id: sizeVariant.id,
      var_opt: (await prisma.variantOption.findFirst({ where: { var_id: sizeVariant.id, value: 'sm' } }))?.id,
      productId: productsList[2].id, // Office Chair
      var_img: "https://example.com/chair_small.jpg",
      stock: 20,
      salePrice: 150,
      discount: 15,
    },
    {
      var_id: sizeVariant.id,
      var_opt: (await prisma.variantOption.findFirst({ where: { var_id: sizeVariant.id, value: 'lg' } }))?.id,
      productId: productsList[2].id, // Office Chair
      var_img: "https://example.com/chair_large.jpg",
      stock: 20,
      salePrice: 150,
      discount: 15,
    },
  ],
});
  // Create Inventory for Products
  // const inventory = await prisma.inventory.createMany({
  //   data: [
  //     {
    
  //       quantity: 100,
  //       restockDate: new Date('2024-10-01'),
  //       location: 'Warehouse 1',
  //       productId: productsList[0].id,
  //     },
  //     {
     
  //       quantity: 200,
  //       restockDate: new Date('2024-09-20'),
  //       location: 'Warehouse 2',
  //       productId: productsList[1].id,
  //     },
  //     {
    
  //       quantity: 50,
  //       restockDate: new Date('2024-11-05'),
  //       location: 'Warehouse 3',
  //       productId: productsList[2].id,
  //     },
  //     {
     
  //       quantity: 0,
  //       restockDate: new Date('2024-12-01'),
  //       location: 'Warehouse 4',
  //       productId: productsList[3].id,
  //     },
  //     {
    
  //       quantity: 400,
  //       restockDate: new Date('2024-09-15'),
  //       location: 'Warehouse 5',
  //       productId: productsList[4].id,
  //     },
  //   ],
  // });

// Create Carts
// const cart = await prisma.cart.createMany({
//   data: [
//     {
//       userId: (await prisma.user.findUnique({ where: { email: "test@test.com" } }))?.id!,
//       quantity: 2,
//       productId: productsList[0].id, // Smartphone
//       variants: (await prisma.productVariant.findFirst({
//         where: {
//           productId: productsList[0],
//           var_opt: (await prisma.variantOption.findFirst({ where: { value: 'B' } }))?.id, 
//         },
//       }))?.id!, // Get variant ID for Smartphone
//     },
//     {
//       userId: (await prisma.user.findUnique({ where: { email: "test@test.com" } }))?.id!,
//       quantity: 1,
//       productId: productsList[1].id, // T-shirt
//       variantOptionId: (await prisma.productVariant.findFirst({
//         where: {
//           productId: productsList[1].id,
//           var_opt: (await prisma.variantOption.findFirst({ where: { value: 'lg' } }))?.id, // Example for size
//         },
//       }))?.id!, // Get variant ID for T-shirt
//     },
//     {
//       userId: (await prisma.user.findUnique({ where: { email: "sanjay@gmail.com" } }))?.id!,
//       quantity: 1,
//       productId: productsList[2].id, // Office Chair
//       variants: (await prisma.productVariant.findFirst({
//         where: {
//           productId: productsList[2].id,
//           var_opt: (await prisma.variantOption.findFirst({ where: { value: 'B' } }))?.id, // Example for color
//         },
//       }))?.id!, // Get variant ID for Office Chair
//     },
    
//   ],
// });




  console.log('Users and accounts created:', { user, user2, account, account2 });
    
}

main()
   .then(()=> prisma.$disconnect())
   .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })