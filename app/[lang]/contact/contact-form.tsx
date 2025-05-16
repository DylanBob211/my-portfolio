'use client'

import { forwardRef, ReactNode, useActionState } from 'react'
import { Dictionary } from '../dictionaries'
import sendEmail from './actions/sendEmail'
import {
  AnimatePresence,
  HTMLMotionProps,
  motion,
  MotionConfig,
} from 'motion/react'

type ActionState = 'pending' | 'error' | 'success' | 'default'

const ActionButton = forwardRef<
  HTMLButtonElement,
  HTMLMotionProps<'button'> & {
    state: ActionState
    loadingContent: string | ReactNode
    successContent: string | ReactNode
    errorContent: string | ReactNode
    defaultContent: string | ReactNode
  }
>(function Mb(
  {
    state,
    loadingContent,
    errorContent,
    successContent,
    defaultContent,
    ...props
  },
  ref
) {
  const variants = {
    hidden: { scaleY: 0 },
    show: { scaleY: 1 },
  }
  const resultContent =
    state === 'error'
      ? errorContent
      : state === 'success'
        ? successContent
        : defaultContent
  return (
    <motion.button
      ref={ref}
      disabled={state === 'pending' || props.disabled}
      transition={{ ease: 'anticipate', duration: 0.05 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.99 }}
      className="relative h-10 overflow-hidden rounded border border-gray-400 p-2 transition ease-in-out focus:ring-1 focus:ring-gray-700 focus:outline-none"
      {...props}
    >
      <MotionConfig transition={{ duration: 0.2, delay: 0.5 }}>
        <AnimatePresence mode="wait">
          {state === 'pending' ? (
            <motion.span
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              key="loading"
              style={{ transformOrigin: 'bottom' }}
              variants={variants}
              initial="hidden"
              animate="show"
              exit="hidden"
            >
              {loadingContent}
            </motion.span>
          ) : (
            <motion.span
              className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2"
              key="result"
              style={{ transformOrigin: 'bottom' }}
              variants={variants}
              initial="hidden"
              animate="show"
              exit="hidden"
            >
              {resultContent}
            </motion.span>
          )}
        </AnimatePresence>
      </MotionConfig>
    </motion.button>
  )
})

export function ContactForm({ dict }: { dict: Dictionary }) {
  const [state, dispatch, isPending] = useActionState(sendEmail, null)
  const isError = !!state?.error
  const isSuccess = !!state?.data
  const actionState = isPending
    ? 'pending'
    : isError
      ? 'error'
      : isSuccess
        ? 'success'
        : 'default'
  return (
    <>
      <form action={dispatch} className="flex flex-col gap-4">
        <label className="flex flex-col">
          <span>{dict.contact.nameLabel}</span>
          <input
            type="text"
            name="name"
            required
            className="rounded border border-gray-400 bg-white p-2 transition ease-in-out focus:ring-1 focus:ring-gray-700 focus:outline-none"
            placeholder={dict.contact.namePlaceholder}
          />
        </label>
        <label className="flex flex-col">
          <span>{dict.contact.emailLabel}</span>
          <input
            type="email"
            name="email"
            required
            className="rounded border border-gray-400 bg-white p-2 transition ease-in-out focus:ring-1 focus:ring-gray-700 focus:outline-none"
            placeholder={dict.contact.emailPlaceholder}
          />
        </label>
        <label className="flex flex-col">
          <span>{dict.contact.messageLabel}</span>
          <textarea
            name="message"
            required
            className="rounded border border-gray-400 bg-white p-2 transition ease-in-out focus:ring-1 focus:ring-gray-700 focus:outline-none"
            placeholder={dict.contact.messagePlaceholder}
            rows={5}
          />
        </label>
        <ActionButton
          state={actionState}
          loadingContent={dict.contact.emailLoading}
          errorContent={dict.contact.emailGenericError}
          successContent={dict.contact.emailSent}
          defaultContent={dict.contact.submitButton}
          type="submit"
        />
      </form>
    </>
  )
}
