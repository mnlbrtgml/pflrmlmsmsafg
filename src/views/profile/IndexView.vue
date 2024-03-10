<template>
  <section class="container">
    <form
      @submit.prevent=""
      class="border-gray-300 bg-gray-100 text-gray-700 mt-10 p-2 border rounded-lg grid grid-cols-12 gap-2 relative"
    >
      <p
        class="bg-primary text-primary-foreground px-4 py-2 font-bold text-xs uppercase rounded-t-lg absolute left-4 -top-8"
      >
        Profile
      </p>

      <div class="col-span-4 pr-2 pl-4 py-4 space-y-4">
        <div class="border-gray-300 bg-gray-200 h-[calc(100%_-_3.4rem)] p-2 border rounded-lg">
          <img
            v-if="profile.imagePath || previewImageUrl"
            :src="previewImageUrl ? previewImageUrl : profile.imagePath ?? undefined"
            class="min-w-full h-[17.4rem] object-contain object-center rounded-lg"
          />
        </div>

        <div class="grid grid-cols-2 gap-2">
          <input
            @change="handleOnChange"
            ref="uploader"
            type="file"
            accept="image/*"
            id="uploader"
            class="hidden"
          />

          <Button asChild>
            <Label for="uploader">Upload</Label>
          </Button>
          <Button @click="handleResetImage" variant="destructive">Reset</Button>
        </div>
      </div>

      <div class="col-span-8 p-4 pl-2 flex flex-col gap-2">
        <div class="space-y-1">
          <Label for="middle-name">First name</Label>
          <Input v-model.trim="profile.firstName" id="middle-name" type="text" />
        </div>

        <div class="space-y-1">
          <Label for="middle-name">Middle name</Label>
          <Input v-model.trim="profile.middleName" id="middle-name" type="text" />
        </div>

        <div class="space-y-1">
          <Label for="middle-name">Last name</Label>
          <Input v-model.trim="profile.lastName" id="middle-name" type="text" />
        </div>

        <div class="space-y-1">
          <Label for="middle-name">Email</Label>
          <Input v-model.trim="profile.emailAddress" id="middle-name" type="text" disabled />
        </div>

        <div class="mt-2 flex justify-end">
          <!-- <Button>Update password</Button> -->
          <Button @click="handleSaveUpdate">Save</Button>
        </div>
      </div>
    </form>
  </section>

  <LoadingSpinner v-if="isLoading" />
</template>

<script lang="ts" setup>
import type { IProfile } from "@/assets/ts/interfaces";
import { ref as useStorageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref, reactive, onMounted } from "vue";
import { auth, storage } from "@/firebase/config";
import useReadUser from "@/firebase/db/users/read";
import useUpdateUser from "@/firebase/db/users/update";
import Button from "@/components/ui/button/Button.vue";
import Label from "@/components/ui/label/Label.vue";
import Input from "@/components/ui/input/Input.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const uid = auth.currentUser?.uid;
const uploader = ref<HTMLInputElement | null>(null);
const file = ref();
const isLoading = ref<boolean>(false);
const previewImageUrl = ref<string>("");
const profile = reactive<IProfile>({
  id: uid ?? "",
  firstName: "",
  middleName: "",
  lastName: "",
  emailAddress: "",
  userRole: "",
  imagePath: null,
});

function handleOnChange(): void {
  file.value = uploader.value?.files;

  if (file.value) {
    const url = URL.createObjectURL(file.value[0]);

    previewImageUrl.value = url;
  }
}

function handleResetImage(): void {
  previewImageUrl.value = "";
}

async function getUserProfile(): Promise<void> {
  const response = await useReadUser(uid as string);

  if (response) {
    profile.firstName = response.data.firstName;
    profile.middleName = response.data.middleName;
    profile.lastName = response.data.lastName;
    profile.emailAddress = response.data.emailAddress;
    profile.userRole = response.data.userRole;
    profile.imagePath = response.data.imagePath;
  }
}

async function handleSaveUpdate(): Promise<void> {
  isLoading.value = true;

  if (previewImageUrl.value) {
    try {
      const storageRef = useStorageRef(storage, uid);
      const snapshot = await uploadBytes(storageRef, file.value[0]);

      if (snapshot) {
        const url = await getDownloadURL(snapshot.ref);

        if (url) {
          profile.imagePath = url;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const response = await useUpdateUser(profile);

  isLoading.value = false;

  if (response.code === "auth/updated-successful") {
    await getUserProfile();
  }
}

onMounted(async () => {
  await getUserProfile();
});
</script>
