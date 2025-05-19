import { createRouter, createWebHistory } from "vue-router";
import Revenue from "@/views/Revenue.vue";
import ProductInventory from "@/views/ProductInventory.vue";
import AddProduct from "@/views/AddProduct.vue"
import Signup from "@/views/Signup.vue";
import Signin from "@/views/Signin.vue";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard-default",
  },
  {
    path: "/dashboard-default",
    name: "Dashboard",
    component: Revenue,
  },
  {
    path: "/products",
    name: "Products",
    component: ProductInventory,
  },
  {
    path: "/new/product",
    name: "Product",
    component: AddProduct,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
  linkActiveClass: "active",
});

export default router;
