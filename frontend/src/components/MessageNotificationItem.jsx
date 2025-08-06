import React from 'react';
import { Flex, Text, IconButton, Tooltip } from '@chakra-ui/react';
import {
  StarIcon,
  SmallCloseIcon,
  RepeatIcon,
  BellOffIcon,
  DeleteIcon,
} from '@chakra-ui/icons';
import '../styles/MessageNotificationItem.css';

export default function MessageNotificationItem({ notification, onUpdate, onDelete }) {
  return (
    <Flex className="message-notification-item" align="center">
      <Text flex="1" className={notification.read ? '' : 'unread'}>
        {notification.message}
      </Text>
      <div className="message-notification-actions">
        <Tooltip label={notification.starred ? 'Unstar' : 'Star'}>
          <IconButton
            aria-label="star"
            icon={<StarIcon />}
            variant={notification.starred ? 'solid' : 'ghost'}
            size="sm"
            onClick={() => onUpdate({ starred: !notification.starred })}
          />
        </Tooltip>
        <Tooltip label={notification.muted ? 'Unmute' : 'Mute'}>
          <IconButton
            aria-label="mute"
            icon={<BellOffIcon />}
            variant={notification.muted ? 'solid' : 'ghost'}
            size="sm"
            onClick={() => onUpdate({ muted: !notification.muted })}
          />
        </Tooltip>
        <Tooltip label={notification.archived ? 'Unarchive' : 'Archive'}>
          <IconButton
            aria-label="archive"
            icon={<SmallCloseIcon />}
            variant={notification.archived ? 'solid' : 'ghost'}
            size="sm"
            onClick={() => onUpdate({ archived: !notification.archived })}
          />
        </Tooltip>
        <Tooltip label={notification.read ? 'Mark as Unread' : 'Mark as Read'}>
          <IconButton
            aria-label="mark-read"
            icon={<RepeatIcon />}
            variant="ghost"
            size="sm"
            onClick={() => onUpdate({ read: !notification.read })}
          />
        </Tooltip>
        <Tooltip label="Delete">
          <IconButton
            aria-label="delete"
            icon={<DeleteIcon />}
            variant="ghost"
            size="sm"
            onClick={onDelete}
          />
        </Tooltip>
      </div>
    </Flex>
  );
}
