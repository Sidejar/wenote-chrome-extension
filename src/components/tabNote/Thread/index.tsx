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
import {
  CheckCircledIcon,
  Cross2Icon,
  PaperPlaneIcon,
  Share2Icon,
} from '@radix-ui/react-icons'
import { Editor } from '~components/common/Editor'
import type { IComment } from '~models'
import useApi from '~hook/useApi'
import { Comment } from './comment'
import { copyShareUrl } from '~services/utils'

export const Thread = forwardRef<HTMLDivElement, Props>(
  ({ note, onClose, ...rest }, ref) => {
    const { api, status } = useApi()
    const [comment, setComment] = useState('')
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

    const handleSend = useCallback(() => {
      api.notes.saveComment(note.id, comment).then((comment) => {
        setComment('')
        setComments((state) => [...state, comment])
      })
    }, [api, note.id, comment])

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
            <IconButton
              variant="ghost"
              color="gray"
              onClick={() => {
                copyShareUrl(note.id)
              }}
            >
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
        <Editor value={comment} onChange={setComment}>
          <IconButton disabled={status === 'posting'} onClick={handleSend}>
            <PaperPlaneIcon />
          </IconButton>
        </Editor>
      </motion.div>
    )
  },
)
