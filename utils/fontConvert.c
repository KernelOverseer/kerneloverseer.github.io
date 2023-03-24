#include <stdio.h>

const unsigned int CHARS[41] = {
    0x00000000,
    0x00E8FE31,
    0x01E8FA3E,
    0x00F8420F,
    0x01E8C63E,
    0x01F87A1F,
    0x01F87A10,
    0x00F84E2F,
    0x0118FE31,
    0x01F2109F,
    0x01F0862F,
    0x01197251,
    0x0108421F,
    0x01BAD6B1,
    0x011CD671,
    0x00E8C62E,
    0x01E8FA10,
    0x00E8D66E,
    0x01E8FA31,
    0x00F8383E,
    0x01F21084,
    0x0118C62E,
    0x0118C544,
    0x0118C6AA,
    0x01151151,
    0x0118A884,
    0x01F9113F,
    0x00ECD66E,
    0x0046509F,
    0x00E8991F,
    0x00E89A2E,
    0x00232BE2,
    0x01F8383E,
    0x00F87E3E,
    0x01F11108,
    0x00E8BA2E,
    0x00F8FC3E,
    0x00000004,
    0x00000088,
    0x00421004,
    0x00E11004
};

void print_binary(unsigned int num)
{
	printf("%d\n", num);
	for (int i = 0; i < 32; i++)
	{
		printf("%d", ((num >> i) & 1));
	}
	printf("\n");
}

unsigned int getBit(unsigned int num, unsigned int offset)
{
	return ((num >> (24 - offset)) & 1);
}

void print_array(int index, unsigned int letter)
{
	printf("\"%d\" : [\n", index);
	for (unsigned int i = 0; i < 5; i++)
	{
		printf("[");
		for (unsigned int j = 0; j < 5; j++)
		{
			printf("%d,", getBit(letter, i*5+j));
		}
		printf("],\n");
	}
	printf("],\n");
}

unsigned int main(void)
{
	for (int i = 0; i < 42; i++)
	{
		print_array(i, CHARS[i]);
	}
}
