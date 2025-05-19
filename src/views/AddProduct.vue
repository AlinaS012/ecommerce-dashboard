<template>
  <div class="w-full flex">
    <div class="flex-[6] w-full h-fill">
      <div class="shadow-custom !p-[10px] !m-[20px] flex">
        <h1 class="text-[20px] text-gray-400 font-nunito font-semibold">
          Add New Product
        </h1>
      </div>

      <div class="shadow-custom !p-[10px] !m-[20px] flex flex-col lg:flex-row">
        <div class="flex-1 text-center">
          <img
            :src="imagePreview"
            alt="Preview"
            class="w-[100px] h-[100px] object-cover rounded-full mx-auto"
          />
        </div>

        <div class="flex-[2] w-full">
          <Form
            @submit="onSubmit"
            :validation-schema="schema"
            class="flex flex-wrap gap-[30px] justify-around"
          >
            <!-- Image Upload -->
            <div class="w-[40%]">
              <label
                for="file"
                class="flex items-center gap-[10px] cursor-pointer text-gray-700"
              >
                Image:
                <font-awesome-icon
                  :icon="['fas', 'cloud-arrow-up']"
                  class="text-lg"
                />
              </label>
              <input
                type="file"
                id="file"
                @change="handleFileChange"
                class="hidden"
              />
            </div>


            <!-- ASIN -->
            <div class="w-[40%]">
              <label class="text-sm text-gray-700 mb-1">ASIN</label>
              <Field name="asin" placeholder="Enter ASIN" class="input" />
              <ErrorMessage name="asin" class="error" />
            </div>

            <!-- Category -->
            <div class="w-[40%]">
              <label class="text-sm text-gray-700 mb-1">Category</label>
              <Field as="select" name="category" class="input">
                <option disabled value="">Select category</option>
                <option value="cables">Cables</option>
                <option value="chargers">Chargers</option>
                <option value="accessories">Accessories</option>
                <option value="audio">Audio</option>
                <option value="mounts">Mounts</option>
                <option value="other">Other</option>
              </Field>
              <ErrorMessage name="category" class="error" />
            </div>

            <!-- Title -->
            <div class="w-[40%]">
              <label class="text-sm text-gray-700 mb-1">Title</label>
              <Field
                name="product_title"
                placeholder="Enter title"
                class="input"
              />
              <ErrorMessage name="product_title" class="error" />
            </div>

            <!-- Price -->
            <div class="w-[40%]">
              <label class="text-sm text-gray-700 mb-1">Price</label>
              <Field
                name="product_price"
                type="number"
                placeholder="Enter price"
                class="input"
              />
              <ErrorMessage name="product_price" class="error" />
            </div>

            <!-- Original Price -->
            <div class="w-[40%]">
              <label class="text-sm text-gray-700 mb-1">Original Price</label>
              <Field
                name="product_original_price"
                type="number"
                placeholder="Enter original price"
                class="input"
              />
              <ErrorMessage name="product_original_price" class="error" />
            </div>

            <!-- Photo URL -->
            <div class="w-[40%]">
              <label class="text-sm text-gray-700 mb-1">Photo URL</label>
              <Field
                name="product_photo"
                placeholder="Enter photo URL"
                class="input"
              />
              <ErrorMessage name="product_photo" class="error" />
            </div>

            <!-- Delivery -->
            <div class="w-[40%]">
              <label class="text-sm text-gray-700 mb-1">Delivery</label>
              <Field
                name="delivery"
                placeholder="Delivery info"
                class="input"
              />
              <ErrorMessage name="delivery" class="error" />
            </div>

            <!-- Stock Level -->
            <div class="w-[40%]">
              <label class="text-sm text-gray-700 mb-1">Stock Level</label>
              <Field
                name="stock_level"
                type="number"
                placeholder="Stock"
                class="input"
              />
              <ErrorMessage name="stock_level" class="error" />
            </div>

            <!-- Low Inventory Threshold -->
            <div class="w-[40%]">
              <label class="text-sm text-gray-700 mb-1"
                >Low Inventory Threshold</label
              >
              <Field
                name="low_inventory_threshold"
                type="number"
                placeholder="Threshold"
                class="input"
              />
              <ErrorMessage name="low_inventory_threshold" class="error" />
            </div>

            <!-- Restock Recommended  -->
            <div class="w-[40%] !mr-32">
              <label class="text-sm text-gray-700 mb-1"
                >Restock Recommended</label
              >
              <Field as="select" name="restock_recommended" class="input">
                <option disabled value="">Select option</option>
                <option :value="true">Yes</option>
                <option :value="false">No</option>
              </Field>
              <ErrorMessage name="restock_recommended" class="error" />
            </div>

            <button
              type="submit"
              :class="[
                'flex items-center justify-center gap-x-4 w-[150px] h-[60px] py-[10px] rounded-md  font-bold mt-[10px] border-none',
                loading
                  ? 'cursor-not-allowed !bg-purple-500 text-white'
                  : '!bg-[#7451f8] text-white cursor-pointer',
              ]"
            >
              <p class="font-nunito">Send</p>
              <CircularProgress v-if="loading" :abs="false" />
            </button>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import CircularProgress from "@/components/CircularProgress/CircularProgress.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { useToast } from "vue-toast-notification";
import * as yup from "yup";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
library.add(faCloudArrowUp);
const toast = useToast();

const props = defineProps({
  inputs: {
    type: Array,
    default: () => [
      { label: "ASIN", type: "text", placeholder: "Enter ASIN", model: "asin" },
      {
        label: "Category",
        type: "text",
        placeholder: "Enter category",
        model: "category",
      },
      {
        label: "Title",
        type: "text",
        placeholder: "Enter title",
        model: "product_title",
      },
      {
        label: "Price",
        type: "number",
        placeholder: "Enter price",
        model: "product_price",
      },
      {
        label: "Original Price",
        type: "number",
        placeholder: "Enter original price",
        model: "product_original_price",
      },
      {
        label: "Photo URL",
        type: "text",
        placeholder: "Enter photo URL",
        model: "product_photo",
      },
      {
        label: "Delivery",
        type: "text",
        placeholder: "Delivery info",
        model: "delivery",
      },
      {
        label: "Stock Level",
        type: "number",
        placeholder: "Stock",
        model: "stock_level",
      },
      {
        label: "Low Inventory Threshold",
        type: "number",
        placeholder: "Threshold",
        model: "low_inventory_threshold",
      },
      {
        label: "Restock Recommended",
        type: "text",
        placeholder: "Yes/No",
        model: "restock_recommended",
      },
    ],
  },
});

const file = ref(null);
const imageUrl = ref("");
const loading = ref(false);
const form = reactive({
  asin: "",
  category: "",
  product_title: "",
  product_price: "",
  product_original_price: "",
  product_photo: "",
  delivery: "",
  stock_level: 0,
  low_inventory_threshold: 0,
  restock_recommended: false,
});

const schema = yup.object({
  asin: yup
    .string()
    .min(10, "ASIN must be 10 or more characters")
    .required("ASIN is required"),
  category: yup
    .string()
    .min(3, "Should be atleast 3 characters")
    .required("Category is required"),
  product_title: yup
    .string()
    .min(3, "Should be atleast 3 characters")
    .required("Title is required"),
  product_price: yup.number().min(1).required("Price is required").positive(),
  product_original_price: yup
    .number()
    .required("Original price is required")
    .positive(),
  product_photo: yup.string().optional().url("Must be a valid URL"),
  delivery: yup.string().required("Delivery info required"),
  stock_level: yup
    .number()
    .min(1, "Minimum value must be 1")
    .required("Stock level required")
    .integer(),
  low_inventory_threshold: yup
    .number()
    .required("Threshold is required")
    .integer()
    .min(1, "Minimum value must be 1"),
  restock_recommended: yup
    .boolean()
    .required("Restock recommendation required"),
});


function handleFileChange(e) {
  file.value = e.target.files[0];
  console.log("Selected file:", file);
}

const imagePreview = computed(() =>
  file.value
    ? URL.createObjectURL(file.value)
    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
);

async function onSubmit(values) {
  if (!file.value && !values.product_photo) {
    alert("You must either upload a photo or pass a photo urls");
    return;
  }

  if (file.value) {
    const fileImg = file.value;
    const formData = new FormData();

    formData.append("file", fileImg);
    formData.append("upload_preset", "upload"); // your unsigned preset

    try {
      loading.value = true;
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dyalojkk2/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      imageUrl.value = data.secure_url;
      console.log("Image uploaded:", data);
      console.log(form, "form data");
      await axios.post(
        "https://ecommerce-dashboard-backend-gilt.vercel.app/api/addProduct",
        {
          ...values,
          product_photo: data.secure_url,
          product_price: `$${values.product_price}`,
          product_original_price: `$${values.product_original_price}`,
        }
      );
      toast.success("Product added successfully!");
      router.push("/products");
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Failed to add product. Please try again.");
    } finally {
      loading.value = false;
    }
  } else if (values.product_photo) {
    try {
      loading.value = true;
      console.log(values, "form data");
      await axios.post(
        "https://ecommerce-dashboard-backend-gilt.vercel.app/api/addProduct",
        {
          ...values,
          product_price: `$${values.product_price}`,
          product_original_price: `$${values.product_original_price}`,
        }
      );
      toast.success("Product added successfully!");
      router.push("/products");
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Failed to add product. Please try again.");
    } finally {
      loading.value = false;
    }
  }
}
</script>

<style scoped>
.shadow-custom {
  box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
}
.input {
  width: 100%;
  padding: 5px;
  border-bottom: 1px solid #ccc;
  outline: none;
}
.input:focus {
  border-color: #9333ea; 
}
.error {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}
.shadow-custom {
  box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
}
</style>
