<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="max-w-3xl mx-auto">
      <div class="bg-white shadow-lg rounded-lg overflow-hidden">
        <div class="px-6 py-8 sm:p-10 sm:pb-6">
          <h3 class="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Nous contacter</h3>

          <p class="text-center mb-6">
            Ou envoyer un email
            <a href="mailto:contact@iotheque.com" class="text-blue-500 hover:text-blue-600"> contact@iotheque.com </a>
          </p>

          <form @submit.prevent="sendContactMessage">
            <div class="space-y-4">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700">Nom Prenom</label>
                <input
                  v-model="contactForm.name"
                  type="text"
                  name="name"
                  id="name"
                  required
                  class="mt-1 block w-full px-4 py-3 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500">
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <input
                  v-model="contactForm.email"
                  type="email"
                  name="email"
                  id="email"
                  required
                  class="mt-1 block w-full px-4 py-3 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"/>
              </div>
              <div>
                <label for="subject" class="block text-sm font-medium text-gray-700">Objet</label>
                <input
                  v-model="contactForm.subject"
                  type="text"
                  name="subject"
                  id="subject"
                  required
                  class="mt-1 block w-full px-4 py-3 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"/>
              </div>
              <div>
                <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  v-model="contactForm.message"
                  name="message"
                  id="message"
                  required
                  rows="4"
                  class="mt-1 block w-full px-4 py-3 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500">
                </textarea>
              </div>
            </div>
            <div class="bg-white backdrop-blur-sm bg-opacity-75 border-t col-span-full p-4 sticky bottom-0 rounded-b-lg flex justify-center">
              <button class="rounded-md font-semibold bg-primary text-white py-2 px-4 gap-4 items-center flex justify-center">
                <span>{{ buttonText }}</span>
                <LoadingIcon v-if="sending" class="animate-spin" color="#fff" size="20" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const sending = ref(false);
const emailSent = ref(false);
const formSubmitted = ref(false);
const buttonText = computed(() => {
  if (sending.value) return 'Envoi...';
  if (emailSent.value) return 'Message envoyé';
  return 'Envoyer Message';
});

const initialFormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const contactForm = ref({ ...initialFormState });

async function sendContactMessage() {
  console.log('sending');
  sending.value = true;
  try {
    const { data } = await useAsyncGql('SendEmail', {
      to: 'contact@iotheque.com',
      from: contactForm.value.email,
      subject: `Contact Us Inquiry: ${contactForm.value.subject}`,
      body: `Name: ${contactForm.value.name}\n\nMessage: ${contactForm.value.message}`.replace(/\n/g, '<br>'),
      clientMutationId: 'contactForm',
    });
    contactForm.value = { ...initialFormState };
    emailSent.value = true;
    formSubmitted.value = true;
    setTimeout(() => (emailSent.value = false), 5000);
  } catch (error) {
  } finally {
    sending.value = false;
  }
}

watch(
  contactForm,
  (newVal, _) => {
    if (formSubmitted.value && JSON.stringify(newVal) !== JSON.stringify(initialFormState)) {
      emailSent.value = false;
      formSubmitted.value = false;
    }
  },
  { deep: true },
);
</script>
