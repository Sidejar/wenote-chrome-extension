import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type { Props } from './types'
import { motion } from 'framer-motion'
import { Flex, IconButton, ScrollArea, Separator } from '@radix-ui/themes'
import { CheckCircledIcon, Cross2Icon, Share2Icon } from '@radix-ui/react-icons'
import { Editor } from '~components/common/Editor'
import type { IComment } from '~models'
import useApi from '~hook/useApi'
import { Comment } from './comment'

export const Thread = forwardRef<HTMLDivElement, Props>(
  ({ note, onClose, ...rest }, ref) => {
    const { api } = useApi()
    const [comments, setComments] = useState<IComment[]>([])

    useEffect(() => {
      api.notes.getComments(note.id).then(setComments)
    }, [api, note.id])

    const rootComment: IComment = useMemo(
      () => ({
        id: 0,
        comment: note.note,
        user: note.user,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
      }),
      [note],
    )

    const handleSend = useCallback(
      async (comment: string) => {
        api.notes.saveComment(note.id, comment).then((comment) => {
          setComments((state) => [...state, comment])
        })
      },
      [api, note.id],
    )

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, marginTop: -8 }}
        animate={{ opacity: 1, marginTop: 0 }}
        exit={{ opacity: 0, marginTop: 8 }}
        transition={{ ease: 'easeOut', duration: 0.2 }}
        className="thread"
        {...rest}
      >
        <div className="topbar">
          <IconButton variant="ghost">
            <CheckCircledIcon width={16} height={16} />
          </IconButton>
          <Flex gap="3">
            <IconButton variant="ghost" color="gray">
              <Share2Icon width={16} height={16} />
            </IconButton>
            <IconButton variant="ghost" color="gray" onClick={onClose}>
              <Cross2Icon width={16} height={16} />
            </IconButton>
          </Flex>
        </div>
        <Separator size="4" />
        <ScrollArea className="list">
          <Comment comment={rootComment} />
          {comments.map((c) => (
            <Comment comment={c} key={c.id} />
          ))}
        </ScrollArea>
        <Editor onSend={handleSend} />
      </motion.div>
    )
  },
)
