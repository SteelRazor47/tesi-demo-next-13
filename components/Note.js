/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { format } from 'date-fns';

// Uncomment if you want to read from a file instead.
// import {readFile} from 'fs/promises';
// import {resolve} from 'path';

import NotePreview from './NotePreview';
import EditButton from './EditButton';
import { Pool } from 'pg';

const pool = new Pool(require('@/credentials'));

async function getNote(id) {
  const { rows } = await pool.query('select * from notes where id = $1', [
    id,
  ]);
  return rows[0]
}

export default async function Note({ selectedId, isEditing }) {
  if (!selectedId) {
      return (
        <div className="note--empty-state">
          <span className="note-text--empty-state">
            Click a note on the left to view something! 🥺
          </span>
        </div>
      );
  }

  const note = await getNote(selectedId);

  let { id, title, body, updated_at } = note;
  const updatedAt = new Date(updated_at);

  // We could also read from a file instead.
  // body = await readFile(resolve(`./notes/${note.id}.md`), 'utf8');

  // Now let's see how the Suspense boundary above lets us not block on this.
  // await fetch('http://localhost:4000/sleep/3000');

  if (isEditing) {
    return null;
  } else {
    return (
      <div className="note">
        <div className="note-header">
          <h1 className="note-title">{title}</h1>
          <div className="note-menu" role="menubar">
            <small className="note-updated-at" role="status">
              Last updated on {format(updatedAt, "d MMM yyyy 'at' h:mm bb")}
            </small>
            <EditButton noteId={id}>Edit</EditButton>
          </div>
        </div>
        <NotePreview body={body} />
      </div>
    );
  }
}
