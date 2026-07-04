import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ValuePropsComponent } from '../home/components/value-props/value-props.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, ValuePropsComponent],
  template: `
    <!-- Page Hero -->
    <section class="bg-gradient-to-br from-[#0f3460] to-[#1a1a2e] text-white py-20 px-4 text-center">
      <h1 class="font-display text-4xl md:text-5xl font-bold mb-4">About Us</h1>
      <p class="text-lg text-white/80 max-w-2xl mx-auto">
        Learn more about Quran Groom Academy and our mission to bring authentic Quranic education to every home.
      </p>
    </section>

    <!-- Academy Description -->
    <section class="py-16 px-4 bg-white">
      <div class="max-w-4xl mx-auto">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="font-display text-3xl font-bold text-[#0f3460] mb-6">
              Who We Are
            </h2>
            <div class="space-y-4 text-gray-600 leading-relaxed">
              <p>
                <strong class="text-[#0f3460]">Quran Groom Academy</strong> is a trusted online Quran learning
                platform dedicated exclusively to women and children. We believe every Muslim woman and child
                deserves access to high-quality Quranic education in a safe, comfortable, and nurturing environment.
              </p>
              <p>
                With more than <strong class="text-[#c9a227]">4 years of teaching experience</strong>, our
                qualified female teachers have guided hundreds of students — from absolute beginners learning
                Noorani Qaida to advanced learners completing Hifz-ul-Quran.
              </p>
              <p>
                All our classes are conducted online via live one-on-one sessions, allowing students to learn
                from the comfort of their own homes at times that suit them. Our curriculum blends traditional
                Islamic pedagogy with modern teaching techniques to ensure effective and enjoyable learning.
              </p>
              <p>
                Whether you are a mother looking for a safe learning space for your daughter, or a woman
                wishing to strengthen your own connection with the Quran, Quran Groom Academy is here to
                guide you every step of the way.
              </p>
            </div>
            <div class="mt-8 flex flex-wrap gap-4">
              <a
                routerLink="/courses"
                class="bg-[#0f3460] hover:bg-[#1a4a7a] text-white font-semibold py-3 px-7 rounded-xl transition-colors duration-200"
              >
                View Courses
              </a>
              <a
                routerLink="/contact"
                class="border-2 border-[#c9a227] text-[#c9a227] hover:bg-[#c9a227] hover:text-white font-semibold py-3 px-7 rounded-xl transition-colors duration-200"
              >
                Book Free Trial
              </a>
            </div>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-2 gap-6">
            <div class="bg-[#0f3460]/5 rounded-2xl p-6 text-center border border-[#0f3460]/10">
              <div class="text-[#c9a227] font-extrabold text-4xl mb-2">4+</div>
              <div class="text-[#0f3460] font-semibold text-sm">Years of Experience</div>
            </div>
            <div class="bg-[#0f3460]/5 rounded-2xl p-6 text-center border border-[#0f3460]/10">
              <div class="text-[#c9a227] font-extrabold text-4xl mb-2">500+</div>
              <div class="text-[#0f3460] font-semibold text-sm">Students Enrolled</div>
            </div>
            <div class="bg-[#0f3460]/5 rounded-2xl p-6 text-center border border-[#0f3460]/10">
              <div class="text-[#c9a227] font-extrabold text-4xl mb-2">5</div>
              <div class="text-[#0f3460] font-semibold text-sm">Specialised Courses</div>
            </div>
            <div class="bg-[#0f3460]/5 rounded-2xl p-6 text-center border border-[#0f3460]/10">
              <div class="text-[#c9a227] font-extrabold text-4xl mb-2">100%</div>
              <div class="text-[#0f3460] font-semibold text-sm">Female Teachers</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <app-value-props />
  `,
})
export class AboutComponent {}
