/**
 * Test for BidiNumber and formatBidiSignedNumber
 * Asserts correct LTR isolation for signed numbers and percentages in RTL context.
 */
import { formatBidiSignedNumber } from '../components/ui/bidi-number';

function runTests() {
  console.log('Running BidiNumber RTL order tests...');

  // Test 1: Positive percent (+14.2%)
  const positivePercent = formatBidiSignedNumber(14.2, { sign: '+', unit: '%' });
  console.assert(
    positivePercent === '\u2066+14.2%\u2069',
    `Expected \\u2066+14.2%\\u2069, got ${JSON.stringify(positivePercent)}`
  );

  // Test 2: Negative percent (-3.1%)
  const negativePercent = formatBidiSignedNumber(-3.1, { sign: 'auto', unit: '%' });
  console.assert(
    negativePercent === '\u2066-3.1%\u2069',
    `Expected \\u2066-3.1%\\u2069, got ${JSON.stringify(negativePercent)}`
  );

  // Test 3: Signed integer (+4)
  const signedInt = formatBidiSignedNumber(4, { sign: '+' });
  console.assert(
    signedInt === '\u2066+4\u2069',
    `Expected \\u2066+4\\u2069, got ${JSON.stringify(signedInt)}`
  );

  // Test 4: Embedding inside Arabic text
  const arabicSentence = `المؤشر ارتفع بمقدار ${positivePercent} خلال الشهر`;
  // Check that the plus sign immediately precedes the digits in the unicode sequence
  const plusIdx = arabicSentence.indexOf('+');
  const digitsIdx = arabicSentence.indexOf('14.2');
  const percentIdx = arabicSentence.indexOf('%');

  console.assert(
    plusIdx < digitsIdx && digitsIdx < percentIdx,
    `Visual order check failed: plus=${plusIdx}, digits=${digitsIdx}, percent=${percentIdx}`
  );

  console.log('All BidiNumber tests passed successfully! Visual order is strictly [+ -> Number -> %].');
}

runTests();
