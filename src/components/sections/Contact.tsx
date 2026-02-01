'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react'
import BlurText from '@/components/ui/BlurText'

const contactInfo = [
  {
    icon: MapPin,
    title: '公司地址',
    content: '上海市静安区\n南京西路 1266 号 恒隆广场',
    href: '#'
  },
  {
    icon: Mail,
    title: '电子邮件',
    content: 'hello@lumina.agency',
    href: 'mailto:hello@lumina.agency'
  },
  {
    icon: Phone,
    title: '联系电话',
    content: '+86 (21) 1234-5678',
    href: 'tel:+862112345678'
  }
]

export default function Contact() {
  const [focusedField, setFocusedField] = useState<string | null>(null)

  return (
    <section id="contact" className="py-32 bg-background relative overflow-hidden">
      <div
        className="absolute top-0 left-0 w-160 h-160 bg-linear-to-br from-primary/5 to-transparent rounded-full blur-3xl -translate-y-1/2 -translate-x-1/3 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-140 h-140 bg-linear-to-tl from-primary/3 to-transparent rounded-full blur-3xl translate-y-1/3 translate-x-1/4 pointer-events-none"
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        ></motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-5">
            <BlurText
              text="让我们一起创造非凡。"
              delay={80}
              animateBy="words"
              direction="top"
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight leading-[1.1]"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-muted-foreground mb-16 max-w-md"
            >
              准备好开始下一个创意了吗？给我们留言或直接来访，我们总是期待听到您的想法。
            </motion.p>

            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="group flex items-start gap-5 p-5 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/20 hover:bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 cursor-pointer"
                >
                  <div className="p-3 rounded-xl bg-secondary text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base mb-1 flex items-center gap-2">
                      {item.title}
                      <ArrowUpRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </h3>
                    <p className="text-muted-foreground text-sm whitespace-pre-line">
                      {item.content}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <Card className="border-border/50 shadow-xl shadow-primary/5 bg-card/80 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-8 md:p-10">
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-2">联系我们</h3>
                  <p className="text-muted-foreground text-sm">
                    填写以下表单，我们会在 24 小时内回复您
                  </p>
                </div>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className={`text-sm font-medium transition-colors duration-200 ${focusedField === 'name' ? 'text-primary' : ''}`}
                      >
                        姓名
                      </label>
                      <Input
                        id="name"
                        placeholder="张三"
                        className="h-12 border-border/50 focus:border-primary transition-all duration-200"
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className={`text-sm font-medium transition-colors duration-200 ${focusedField === 'email' ? 'text-primary' : ''}`}
                      >
                        邮箱
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="zhangsan@example.com"
                        className="h-12 border-border/50 focus:border-primary transition-all duration-200"
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="subject"
                      className={`text-sm font-medium transition-colors duration-200 ${focusedField === 'subject' ? 'text-primary' : ''}`}
                    >
                      主题
                    </label>
                    <Input
                      id="subject"
                      placeholder="项目咨询"
                      className="h-12 border-border/50 focus:border-primary transition-all duration-200"
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className={`text-sm font-medium transition-colors duration-200 ${focusedField === 'message' ? 'text-primary' : ''}`}
                    >
                      留言内容
                    </label>
                    <Textarea
                      id="message"
                      placeholder="请告诉我们您的项目需求..."
                      className="min-h-40 border-border/50 focus:border-primary transition-all duration-200 resize-none"
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-14 text-base font-medium group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      发送信息
                    </span>
                  </Button>
                </form>

                <div
                  className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-primary/5 to-transparent pointer-events-none"
                  aria-hidden="true"
                />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
