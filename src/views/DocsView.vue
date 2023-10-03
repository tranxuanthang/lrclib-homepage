<template>
  <div class="min-h-screen py-6 px-2 mx-auto w-full max-w-screen-sm">
    <div class="text-sm mb-8">
      <router-link to="/" class="text-indigo-400 hover:text-indigo-500 active:text-indigo-700 transition flex items-center uppercase gap-2">
        <ArrowLeft />
        <span>Back to home</span>
      </router-link>
    </div>

    <h1 class="block font-thin text-2xl mb-16">API Documentation</h1>

    <div class="mb-16 prose prose-indigo">
      <p>
        Welcome to the beta API documentation and specification of the LRCLIB's API!
        Although we intend to maintain backward compatibility, please be aware that there may be breaking changes in future updates.
        Since this document is still in its early stages, it may lack information or contain inaccuracies in certain sections.
      </p>

      <p>
        At present, this API has no rate limiting in place and is openly accessible to all users and applications.
        There is no need for an API key or any kind of registering!
      </p>

      <p>While this is not mandatory, if you are developing an application to interact with LRCLIB,
        we encourage you to include the User-Agent header in your requests, specifying your
        application's name, version, and a link to its homepage or project page.
        For example: <code>LRCGET v0.2.0 (https://github.com/tranxuanthang/lrcget)</code>.</p>
    </div>

    <div class="flex flex-col gap-12">
      <ApiBlock>
        <template #title>Get lyrics with a track's signature</template>
        <template #method>GET</template>
        <template #route>/api/get</template>
        <template #description>
          <p>
            Attempt to find the best match of lyrics for the track. You must provide
            the exact signature of the track, including the track title, artist name,
            album name, and the track's duration in seconds.
          </p>
          <p>
            Each time you request a new track's signature, this API will attempt to access external sources
            in case the lyrics are not found in the internal database.
            Therefore, the response time will vary significantly.
            If you prefer to avoid this behavior, please use the <code>/api/get-cached</code> API instead.
          </p>
          <p>
            <strong>Note:</strong> The provided duration is crucial. LRCLIB will attempt to provide the lyrics
            only when the duration matches the record in LRCLIB's database, or at least with
            a difference of ±2 seconds in duration.
          </p>

          <h4>Query parameters</h4>
          <p>
            <table>
              <thead>
                <th>Field</th>
                <th>Required</th>
                <th>Type</th>
                <th>Description</th>
              </thead>

              <tbody>
                <tr><td>track_name</td><td>true</td><td>string</td><td>Title of the track</td></tr>
                <tr><td>artist_name</td><td>true</td><td>string</td><td>Name of the artist</td></tr>
                <tr><td>album_name</td><td>true</td><td>string</td><td>Name of the album</td></tr>
                <tr><td>duration</td><td>true</td><td>number</td><td>Track's duration in seconds</td></tr>
              </tbody>
            </table>
          </p>

          <h4>Example request</h4>
          <p>
            <pre>GET /api/get?artist_name=Borislav+Slavov&track_name=I+Want+to+Live&album_name=Baldur%27s+Gate+3+(Original+Game+Soundtrack)&duration=233</pre>
          </p>

          <h4>Example response</h4>
          <p class="text-green-800">200 OK:</p>
          <p>
            <pre class="whitespace-pre-wrap">{
  &quot;id&quot;: 3396226,
  &quot;trackName&quot;: &quot;I Want to Live&quot;,
  &quot;artistName&quot;: &quot;Borislav Slavov&quot;,
  &quot;albumName&quot;: &quot;Baldur&#39;s Gate 3 (Original Game Soundtrack)&quot;,
  &quot;duration&quot;: 233,
  &quot;instrumental&quot;: false,
  &quot;plainLyrics&quot;: &quot;I feel your breath upon my neck\n...The clock won&#39;t stop and this is what we get\n&quot;,
  &quot;syncedLyrics&quot;: &quot;[00:17.12] I feel your breath upon my neck\n...[03:20.31] The clock won&#39;t stop and this is what we get\n[03:25.72] &quot;
}</pre>
          </p>

          <p class="text-red-800">404 Not Found:</p>
          <p>
            <pre class="whitespace-pre-wrap">{
  &quot;code&quot;: 404,
  &quot;name&quot;: &quot;TrackNotFound&quot;,
  &quot;message&quot;: &quot;Failed to find specified track&quot;
}</pre>
          </p>
        </template>
      </ApiBlock>

      <ApiBlock>
        <template #title>Get lyrics with a track's signature (cached)</template>
        <template #method>GET</template>
        <template #route>/api/get-cached</template>
        <template #description>
          <p>
            This API is similar to <code>/api/get</code>, except that it will only look for lyrics from internal database,
            and will NOT attempt to access external sources.
          </p>

          <h4>Query parameters</h4>
          <p>
            <table>
              <thead>
                <th>Field</th>
                <th>Required</th>
                <th>Type</th>
                <th>Description</th>
              </thead>

              <tbody>
                <tr><td>track_name</td><td>true</td><td>string</td><td>Title of the track</td></tr>
                <tr><td>artist_name</td><td>true</td><td>string</td><td>Name of the artist</td></tr>
                <tr><td>album_name</td><td>true</td><td>string</td><td>Name of the album</td></tr>
                <tr><td>duration</td><td>true</td><td>number</td><td>Track's duration in seconds</td></tr>
              </tbody>
            </table>
          </p>

          <h4>Example request</h4>
          <p>
            <pre>GET /api/get-cached?artist_name=Jeremy+Soule&track_name=Dragonborn&album_name=The+Elder+Scrolls+V:+Skyrim:+Original+Game+Soundtrack&duration=236</pre>
          </p>

          <h4>Example response</h4>
          <p class="italic">Please see the <code>/api/get</code>'s example response.</p>
        </template>
      </ApiBlock>

      <ApiBlock>
        <template #title>Get lyrics by LRCLIB's ID</template>
        <template #method>GET</template>
        <template #route>/api/get/{id}</template>
        <template #description>
          <p>
            Get a lyrics record by an absolute ID. ID of a lyrics record can be retrieved from other APIs, such as <code>/api/search</code> API.
          </p>

          <h4>URL parameters</h4>
          <p>
            <table>
              <thead>
                <th>Field</th>
                <th>Required</th>
                <th>Type</th>
                <th>Description</th>
              </thead>

              <tbody>
                <tr><td>id</td><td>true</td><td>number</td><td>ID of the lyrics record</td></tr>
              </tbody>
            </table>
          </p>

          <h4>Example request</h4>
          <p>
            <pre>GET /api/get/3396226</pre>
          </p>

          <h4>Example response</h4>
          <p class="italic">Please see the <code>/api/get</code>'s example response.</p>
        </template>
      </ApiBlock>

      <ApiBlock>
        <template #title>Search for lyrics records</template>
        <template #method>GET</template>
        <template #route>/api/search</template>
        <template #description>
          <p>
            Search for lyrics records by a keyword. This API returns an array of lyrics records that matched by the search condition(s).
          </p>

          <p>
            At least ONE of the two parameters: <code>q</code> AND <code>track_name</code> must be present.
          </p>

          <p>
            <strong>Note:</strong> This API only returns 20 results or less, and currently has no pagination. This is subject to change in the future.
          </p>

          <h4>Query parameters</h4>
          <p>
            <table>
              <thead>
                <th>Field</th>
                <th>Required</th>
                <th>Type</th>
                <th>Description</th>
              </thead>

              <tbody>
                <tr><td>q</td><td>conditional</td><td>string</td><td>Search for keyword present in ANY fields (track's title, artist name or album name)</td></tr>
                <tr><td>track_name</td><td>conditional</td><td>string</td><td>Search for keyword in track's title</td></tr>
                <tr><td>artist_name</td><td>false</td><td>string</td><td>Search for keyword in track's artist name</td></tr>
                <tr><td>album_name</td><td>false</td><td>string</td><td>Search for keyword in track's album name</td></tr>
              </tbody>
            </table>
          </p>

          <h4>Example request</h4>
          <p>Search for lyrics by using only <code>q</code> parameter:</p>
          <p>
            <pre>GET /api/search?q=still+alive+portal</pre>
          </p>

          <p>Search for lyrics by using multiple fields:</p>
          <p>
            <pre>GET /api/search?track_name=22&artist_name=taylor+swift</pre>
          </p>

          <h4>Response</h4>
          <p>
            JSON array of the lyrics records with the following parameters: <code>id</code>, <code>trackName</code>, <code>artistName</code>, <code>albumName</code>,
            <code>duration</code>, <code>instrumental</code>, <code>plainLyrics</code> and <code>syncedLyrics</code>.
          </p>
        </template>
      </ApiBlock>
    </div>
  </div>
</template>

<script setup>
import { ArrowLeft } from 'mdue'
import ApiBlock from '../components/ApiBlock.vue'
</script>
